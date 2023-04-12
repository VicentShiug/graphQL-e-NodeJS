import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";
import crypto from "crypto";

@Resolver()
export class UserResolver {
	private data: User[] = [];

	@Query(() => [User])
	async users() {
		return this.data;
	}

	@Mutation(() => User)
	async createUser(@Arg("nome") nome: string) {
		const user = { id: crypto.randomUUID(), nome };
		this.data.push(user);
		return user;
	}
}
