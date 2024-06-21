import { xdescribe, describe, beforeEach , it, expect } from "vitest";
import { Configuration } from "../../../src/infra/database/Configuration";
import { ConnectionFactory } from "../../../src/infra/database/ConnectionFactory";
import { UserRepository, PostgresUserRepository } from "../../../src/infra/database/PostgresUserRepository";
import { User } from "../../../src/domain/User";

describe('User repository', () =>{
    let userRepository: UserRepository;

    beforeEach(() =>{
        const connectionFactory = new ConnectionFactory(new Configuration());
        userRepository = new PostgresUserRepository(connectionFactory);
    });


    xdescribe('Find user should', () => {
        it('return found user', async () =>{
            const anEmail = "e@ma.il";
            
            const user = await userRepository.find(anEmail);

            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(User);
            expect(user?.email).toBe(anEmail);
        });
    });
});
