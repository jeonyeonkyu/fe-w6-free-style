const delay = (data, ms) => new Promise(resolve => setTimeout(() => resolve(data), ms));

export { delay };