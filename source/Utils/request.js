/**
 * 管理 URL 和处理请求
 */

const headers = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json;charset=UTF-8",
});

const URL = {
	perlink: () => "http://101.132.100.188:8080",
	login: () => "/snake/interface/login",
	getinfo: () => "/snake/interface/getinfo",
};

const _handleResponse = (response) => {
	if (response.status < 500) {
		return response.json();
	} else {
		console.error(`Request failed. Message = ${response.statusText}`);
		return { error: { msg: "Server error." } };
	}
};

const post = (url) =>
	fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
		headers: headers,
	})
		.then((response) => {
			return _handleResponse(response);
		})
		.catch((err) => {
			console.error(`Request failed. Message = ${err}`);
			return { error: { msg: "Request failed." } };
		});

export { post, URL };
