import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node'

const handlers = [
    http.get("https://api.chucknorris.io/jokes/random", () => {
        return HttpResponse.json({ value: "hahahaha" }, { status: 200 })
    })/* ,
    http.post("xxx",()=>{
        ....
    }) */
]

export const server = setupServer(...handlers)