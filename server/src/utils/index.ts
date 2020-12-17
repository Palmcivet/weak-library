export const isDev = process.env.NODE_ENV === "development";

export const hasKeys = (obj: object) => Object.keys(obj).length > 0;

export const hasElements = (arr: Array<any>) => arr.length !== 0;

export const cloneObj = (obj: object, deepCopy = true) => {
	return deepCopy ? JSON.parse(JSON.stringify(obj)) : Object.assign({}, obj);
};
