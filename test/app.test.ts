import { describe, it, expect } from "vitest";
import request  from "supertest";
import app from "../src/infra/app";

describe("app", () =>{
    it("should return pong when /ping is called", async () => {
        const response = await request(app).get('/ping');
        
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('pong!');
    });
    it("should return Hello World! when /status is called", async () => {
        const response = await request(app).get('/status');
    
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
    it.skip("should return a user when GET /users is called", async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
        const body = await response.json();
        expect(body).toBe('Hello World!');
    });
    it.skip("should create a user when /users is called", async () => {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify({
                name: 'John Doe',
                email: 'e@ma.il'})
            });
        const body = await response.json();
        expect(body).toBe('Hello World!');
    });
});