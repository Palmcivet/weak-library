/**
 * 管理 URL 和处理请求
 */

const headers = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json",
	mode: "cors",
});

const authURL = {
	perlink: "http://101.132.100.188:8080",
	login: "http://101.132.100.188:8080/snake/interface/login",
	getinfo: "http://101.132.100.188:8080/snake/interface/getinfo",
};

const wsURL = {
	chat: "ws://localhost:8080/chat",
};

const _handleResponse = (response) => {
	if (response.status < 500) {
		return response.json();
	} else {
		console.error(`Request failed. Message = ${response.statusText}`);
		return { error: { msg: "Server error." } };
	}
};

const post = (url, data) =>
	fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
		headers: headers,
	})
		.then((response) => _handleResponse(response))
		.catch((err) => {
			console.error(`Request failed. Message = ${err}`);
			return { error: { msg: "Request failed." } };
		});

export { post, authURL, wsURL };
