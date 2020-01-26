/**
 * 包装 `setTimeout()` 函数，校准时间误差
 * @param {Function} argCallback - 回调函数
 * @param {Number} argTime - 延迟时间
 */
const Timer = (argCallback, argTime) => {
	let startTime = new Date().getTime();
	let restTime = 0;
	restTime = argTime + startTime - new Date().getTime();
	return setTimeout(() => {
		argCallback();
		Timer(argCallback, argTime);
	}, restTime);
};

export { Timer };
