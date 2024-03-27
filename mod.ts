import { Stats as NodeFsStats, statSync as fsStatSync } from "node:fs";
import { stat as fsStat } from "node:fs/promises";
import { extname as pathExtname } from "node:path";
import { getgid, getuid, platform } from "node:process";
import envPathExt from "https://raw.githubusercontent.com/hugoalh-studio/cross-env-ts/v1.1.0/pathext.ts";
const isOSWindows: boolean = platform === "win32";
export interface IsExecutableOptions {
	/**
	 * If the file is not exist, whether to return `false` instead of throw an error.
	 * @default false
	 */
	mayNotExist?: boolean;
	/**
	 * Effective group ID to check executable mode flags on POSIX system. Default to the group ID of the current process.
	 */
	gid?: number;
	/**
	 * Effective user ID to check executable mode flags on POSIX system. Default to the user ID of the current process.
	 */
	uid?: number;
}
/**
 * Determine whether the file is executable on the POSIX operate system.
 * @access private
 * @param {NodeFsStats} stat Stat of the file.
 * @param {IsExecutableOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function isExecutablePosix(stat: NodeFsStats, options: IsExecutableOptions = {}): boolean {
	if (!stat.isFile()) {
		return false;
	}
	const ownGid: number | null = options.gid ?? ((typeof Deno === "undefined") ? (getgid?.() ?? null) : Deno.gid());
	const ownUid: number | null = options.uid ?? ((typeof Deno === "undefined") ? (getuid?.() ?? null) : Deno.uid());
	if (ownGid === null) {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (ownUid === null) {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const pathGid: number | null = stat.gid;
	const pathMode: number | null = stat.mode;
	const pathUid: number | null = stat.uid;
	if (pathGid === null) {
		throw new Error(`Unable to get the group ID of the file!`);
	}
	if (pathMode === null) {
		throw new Error(`Unable to get the mode of the file!`);
	}
	if (pathUid === null) {
		throw new Error(`Unable to get the user ID of the file!`);
	}
	const g: number = Number.parseInt('010', 8);
	const o: number = Number.parseInt('001', 8);
	const u: number = Number.parseInt('100', 8);
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
/**
 * Determine whether the file is executable on the Windows operate system.
 * @access private
 * @param {NodeFsStats} stat Stat of the file.
 * @param {string} filePath Path of the file.
 * @returns {boolean} Determine result.
 */
function isExecutableWindows(stat: NodeFsStats, filePath: string): boolean {
	if (!stat.isFile()) {
		return false;
	}
	const pathExts: string[] | null = envPathExt.get();
	if (pathExts === null) {
		return true;
	}
	return pathExts.map((pathExt: string): string => {
		return pathExt.toLowerCase();
	}).includes(pathExtname(filePath).toLowerCase());
}
/**
 * Determine whether the file is executable on the current operate system.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment (`allow-env`)
 * >   - `PATHEXT` *(For Windows Only)*
 * > - File System - Read (`allow-read`)
 * > - System Info (`allow-sys`)
 * >   - `gid` *(For Non-Windows Only)*
 * >   - `uid` *(For Non-Windows Only)*
 * @param {string} filePath Path of the file.
 * @param {IsExecutableOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isExecutable(filePath: string, options: IsExecutableOptions = {}): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const pathStat: NodeFsStats = await fsStat(filePath);
		if (isOSWindows) {
			return isExecutableWindows(pathStat, filePath);
		}
		return isExecutablePosix(pathStat, options);
	} catch (error) {
		if (mayNotExist && (
			(typeof Deno !== "undefined" && error instanceof Deno.errors.NotFound) ||
			error?.code === "EACCES"
		)) {
			return false;
		}
		throw error;
	}
}
export default isExecutable;
/**
 * Determine whether the file is executable on the current operate system.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment (`allow-env`)
 * >   - `PATHEXT` *(For Windows Only)*
 * > - File System - Read (`allow-read`)
 * > - System Info (`allow-sys`)
 * >   - `gid` *(For Non-Windows Only)*
 * >   - `uid` *(For Non-Windows Only)*
 * @param {string} filePath Path of the file.
 * @param {IsExecutableOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutableSync(filePath: string, options: IsExecutableOptions = {}): boolean {
	const { mayNotExist = false } = options;
	try {
		const pathStat: NodeFsStats = fsStatSync(filePath);
		if (isOSWindows) {
			return isExecutableWindows(pathStat, filePath);
		}
		return isExecutablePosix(pathStat, options);
	} catch (error) {
		if (mayNotExist && (
			(typeof Deno !== "undefined" && error instanceof Deno.errors.NotFound) ||
			error?.code === "EACCES"
		)) {
			return false;
		}
		throw error;
	}
}
