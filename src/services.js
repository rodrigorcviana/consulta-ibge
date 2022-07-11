
const host = 'http://192.168.0.115:5000'

const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const json = await response.json();

        return json;
    } catch (e) {
        return { Status: false, Message: "The requested URL failed to provide a proper response"};
    }
}

export const getTables = async () => {
    return request(`${host}/reports/tables`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getRegionColumns = async (columns, params, linhas=20) => {
    return request(`${host}/reports/query-regions?columns[]=${columns.toString()}&pagina=1&quantidade=${linhas}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(params),
    });
}

export const getCitiesColumns = async (columns, params, linhas=20) => {
    return request(`${host}/reports/query-cities?columns[]=${columns.toString()}&pagina=1&quantidade=${linhas}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(params),
    });
}

export const getStatesColumns = async (columns, params, linhas=20) => {
    return request(`${host}/reports/query-states?columns[]=${columns.toString()}&pagina=1&quantidade=${linhas}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(params),
    });
}

export const getDistrictsColumns = async (columns, params, linhas=20) => {
    return request(`${host}/reports/query-districts?columns[]=${columns.toString()}&pagina=1&quantidade=${linhas}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(params),
    });
}