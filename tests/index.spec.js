import request from "supertest";
import { app } from "../src/app.ts";
import { Connection } from "../src/database/mongodb.ts";

// describe("/create/user", () => {
//     beforeAll(async () => {
//         await Connection();
//     });

//     test("En caso de no pasar ningun body devuelve 405", async () => {
//         const response = await request(app).post("/create/user");
//         expect(response.status).toBe(405);
//     });
//     it("Debe devolver 201 usuario creado", async () => {
//         const client = {
//             name: "Gustavo",
//             email: "gustavito@ellokero.com",
//             password: "12345",
//         };
//         const response = await request(app).post("/create/user").send(client);
//         expect(response.status).toBe(201);
//     });
//     it("Debe devolver 401 usuario existente", async () => {
//         const client = {
//             name: "Gustavo",
//             email: "gustavito@ellokero.com",
//             password: "12345",
//         };
//         const response = await request(app).post("/create/user").send(client);
//         expect(response.status).toBe(401);
//     });
// });

// describe("/auth/token", () => {
//     beforeAll(async () => {
//         await Connection();
//     });

//     it("Debe devolver 405 en caso de no pasar ningun body", async () => {
//         const response = await request(app).post("/auth/token").send();
//         expect(405).toBe(response.statusCode);
//     });

//     it("Debe devolver 200 en caso de pasar datos correctos", async () => {
//         const response = await request(app)
//             .post("/auth/token")
//             .send({
//                 email: "guidogauna9@gmail.com",
//                 password: "fifa2015",
//             })
//             .set("Content-Type", "application/json")
//             .set("Accept", "application/json");
//         console.log(response.body)
//         expect(200).toBe(response.statusCode);
//     });
//     it("Debe devolver 401 cuando el usuario ingresa mal sus datos o no existe en la base de datos", async () => {
//         const response = await request(app)
//             .post("/auth/token")
//             .send({
//                 email: "guidogauna9@gmail.com",
//                 password: "fifa 2015",
//             })
//             .set("Content-Type", "application/json")
//             .set("Accept", "application/json");
//         expect(401).toBe(response.statusCode);
//     });
// });

// describe("getUser", () => {
//     beforeAll(async () => {
//         await Connection();
//     });
//     test("debe de retornar 401 por el token mal puesto", async () => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NDkzNDUwMywiZXhwIjoxNjg1MTA3MzAzfQ.Z-TyzytfJnOceZKdfmY"
//         const response = await request(app)
//             .get("/user")
//             .set({ Authorization: `bearer ${token}` });
//         expect(response.statusCode).toBe(401)

//     });
//     test("debe de retornar 200 ", async () => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NDkzNTkyMCwiZXhwIjoxNjg1MTA4NzIwfQ.PnKHUGw5r2BHEmTEZYmpqfDX1clqPyEO7dxADMva_iA"
//         const response = await request(app)
//             .get("/user")
//             .set({ Authorization: `bearer ${token}` });
//         expect(response.statusCode).toBe(200)

//     });
// });


// describe('Validate Token', () => {
//     beforeAll(async () => {
//         await Connection();
//     });
//     test('debe devolver token invalido 404', async () => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NDkzNTkyMCwiZXhwIjoxNjg1MTA4NzIwfQ.PnKHUGw5r2BHEmTEZYmpqfDX1xADMva_iA"
//         const response = await request(app).get("/validate/token").set({ Authorization: `bearer ${token}` })
//         expect(response.statusCode).toBe(404)
//     })
//     test('debe devolver 200 token valido', async () => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NDkzNjc1NywiZXhwIjoxNjg1MTA5NTU3fQ.Jk_xnwDK9-Ny3fob51Ml0F1PSGFeDMNiKu_z_0-O1qk"
//         const response = await request(app).get("/validate/token").set({ Authorization: `bearer ${token}` })
//         expect(response.statusCode).toBe(200)
//     })
// });

// describe("/create/note", () => {
//     beforeAll(async () => {
//         await Connection();
//     });
//     const mockedNote = {
//         content: "Estoy probando los test",
//         title: "test"
//     }
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NDkzNTkyMCwiZXhwIjoxNjg1MTA4NzIwfQ.PnKHUGw5r2BHEmTEZYmpqfDX1clqPyEO7dxADMva_iA"
//     it('Deberia crear la nota en la base de datos y responder con 201', async () => {
//         const response = await request(app).post("/create/note").set({ Authorization: `bearer ${token}` }).send(mockedNote)
//         expect(response.status).toBe(201)
//     });
//     it('Deberia retornar 400 en caso de no pasar datos', async () => {
//         const response = await request(app).post("/create/note").set({ Authorization: `bearer ${token}` }).send()
//         expect(response.status).toBe()
//     });
// })
// describe("/update/note", () => {
//     beforeAll(async () => {
//         await Connection();
//     });
//     const id = "6468dc521e655205765264ff"
//     const mockedNote = {
//         content: "Estoy probando los test y te sigo odiando valen",
//     }
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhkN2VjZDcxZjVlMWZiZTAzY2ZmMCIsImlhdCI6MTY4NTM2NDU0MiwiZXhwIjoxNjg1NTM3MzQyfQ.2B8cZBgnMPEKvFYxUr3bTq58TuPbKaqiIr8HnvPUY0Q"
//     it('Debe actualizar la nota y devolver status 200', async () => {
//         const response = await request(app).patch(`/update/${id}`).set({ Authorization: `bearer ${token}` }).send(mockedNote)
//         expect(response.status).toBe(200)
//     });

//     it('Debe retornar status 400 en caso de introducir un mal id o que no exista ', async () => {
//         const response = await request(app).patch(`/update/asdqw`).set({ Authorization: `bearer ${token}` }).send(mockedNote)
//         expect(response.status).toBe(400)
//     });

// })

describe('/delete/note', () => {
    beforeAll(async () => {
        await Connection();
    });
    const id = "646e1d1ee72d19394ccd38f1"
    it('Debe actualizar la nota y devolver status 200', async () => {
        const response = await request(app).delete(`/delete/${id}`)
        expect(response.status).toBe(200)
    });
    it('Debe retornar status 404 en caso de que el id no sea encontrado', async () => {
        const response = await request(app).delete(`/delete/${id}`)
        expect(response.status).toBe(404)
    });
});

