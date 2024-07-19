import { describe, beforeEach , it, expect, afterEach } from "vitest";
import { Configuration } from "../../../src/infra/database/Configuration";
import { ConnectionFactory } from "../../../src/infra/database/ConnectionFactory";
import { UserRepository, PostgresUserRepository } from "../../../src/infra/database/PostgresUserRepository";
import { User } from "../../../src/domain/User";

describe('User repository', () =>{
    let userRepository: UserRepository;
    const anEmail = "e@ma.il";

    beforeEach(() =>{
        const connectionFactory = new ConnectionFactory(new Configuration());
        userRepository = new PostgresUserRepository(connectionFactory);
        userRepository.save(new User(anEmail, "password", "admin"));
    });

    describe.skip('Find user should', () => {
        it('return found user', async () =>{          
            const user = await userRepository.find(anEmail);

            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(User);
            expect(user?.email).toBe(anEmail);
        });
    });

    afterEach(() =>{
        userRepository.delete(anEmail);
    });
});
