export default class FetchService {
    constructor() {

    }

    buildHeaders(authorization = null){
        const headers = {
            "Content-type": "application/json",
            "Authorization": (authorization)? authorization : "Bearer TOKEN_MISSING"
        }
        return headers
    }

    buildHeadersFile(authorization = null){
        const headers = {
            "Authorization": (authorization)? authorization : "Bearer TOKEN_MISSING"
        }
        return headers
    }
    
    buildJsonFormData(form){
        const jsonFormData = { };
        for(const pair of new FormData(form)){
            jsonFormData[pair[0]] = pair[1];
        }
        return jsonFormData;
    }

    async performGetHttpRequest(fetchLink, headers, query=null) {
        if(!fetchLink || !headers) {
            throw new Error("One or more GET request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "GET",
                headers: headers,
                query: (query != null) ? query : ""
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch GET: ${err}`);
            throw err;
        }
    }

    async performPostHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch POST: ${err}`);
            throw err;
        }
    }

    async performPostHttpRequestFile(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "POST",
                headers: headers,
                body: body
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch POST: ${err}`);
            throw err;
        }
    }

    async performPostHttpRequestNoBody(fetchLink, headers, body=null) {
        if(!fetchLink || !headers) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "POST",
                headers: headers,
                body: body
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch POST: ${err}`);
            throw err;
        }
    }

    async performPutHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch PUT: ${err}`);
            throw err;
        }
    }

    async performPatchHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch PATCH: ${err}`);
            throw err;
        }
    }

    async performDeleteHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch DELETE: ${err}`);
            throw err;
        }
    }

}