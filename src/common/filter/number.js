//将字符串四舍五入
export function twoDigital(num) {
	if (num) {
		if (parseInt(num) === num) {
			return num;
		} else {
			return num.toFixed(2);
		}
	} else {
		return num;
	}

}
