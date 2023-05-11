import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _RoleConstructor = {
	id?: number
	label: string
	users?: _User[] | User[] | RelationMany<_User>
}

export class _Role implements PrismaClass {
	static prisma: Prisma.RoleDelegate<undefined>
	get prisma(): Prisma.RoleDelegate<undefined> {
		return _Role.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static async initList() {
		if (this.enumList === null) {
			return
		}

		const models = await this.prisma.findMany()
		this.enumList = []
		for (const model of models) {
			this.enumList.push(new _Role(model))
		}
	}

	private static enumList: _Role[]
	static get list(): _Role[] {
		return this.enumList
	}

	static getIncludes(
		param?:
			| number
			| {
					users?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
			  },
	): Prisma.RoleInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					users: true,
				}
			}
			return {
				users: { include: _User.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			const query = {
				users: Object.keys(param).includes('users')
					? typeof param.users === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.users),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) => query[key] === undefined && delete query[key],
			)

			return query
		}
	}

	// ID
	private _id: number = -1
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	label: string

	private _users: RelationMany<_User>
	public get users(): RelationMany<_User> {
		return this._users
	}
	private set users(value: RelationMany<_User>) {
		this._users = value
	}

	constructor(obj: _RoleConstructor) {
		this.init(obj)
	}

	private init(obj: _RoleConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.label = obj.label

		if (!obj.users || obj.users.length === 0) {
			this.users = new RelationMany<_User>()
		} else if (obj.users instanceof RelationMany) {
			this.users = obj.users
		} else if (obj.users[0] instanceof _User) {
			this.users = new RelationMany<_User>(obj.users as _User[])
		} else {
			const usersArray: _User[] = []
			for (const value of obj.users as User[]) {
				usersArray.push(new _User(value))
			}
			this.users = new RelationMany<_User>(usersArray)
		}
	}

	update(obj: { label?: string }) {
		if (obj.label !== undefined) {
			this.label = obj.label
		}
	}

	toJSON() {
		return { id: this.id, label: this.label, users: this.users }
	}
	nonRelationsToJSON() {
		return { id: this.id!, label: this.label! }
	}

	static async all(query?: Prisma.RoleFindFirstArgsBase): Promise<_Role[]> {
		const models = await _Role.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Role(m))
			return acc
		}, [] as _Role[])
	}

	static async from(
		query?: Prisma.RoleFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Role | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Role.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Role.getIncludes()
			}
		}

		const dbQuery = await _Role.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Role(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Role.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Role.getIncludes>[0], number>,
	): Promise<void> {
		if (param === undefined) {
			param = 0
		}

		if (
			(typeof param === 'number' && param < 0) ||
			(typeof param === 'object' && Object.keys(param).length === 0)
		) {
			return
		}

		if (this.id !== -1) {
			const dbThis = await _Role.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Role.getIncludes(param),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })
			}
		}
	}

	async save(): Promise<boolean> {
		try {
			await this.prismaClient.$transaction(
				async (tx): Promise<number> => {
					const saveYield = this.saveToTransaction(tx)
					await saveYield.next()
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	private _saving: boolean = false
	get saving(): boolean {
		return this._saving
	}
	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		this._saving = true

		this.checkRequiredFields()

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// Relations toOne

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		const usersConnections: Prisma.Enumerable<Prisma.UserWhereUniqueInput> =
			[]
		for (const relation of this.users) {
			usersConnections.push({
				id: relation.primaryKey,
			})
		}
		const usersDisconnections: Prisma.Enumerable<Prisma.UserWhereUniqueInput> =
			[]
		for (const relation of this.users.toRemoveRelations) {
			usersConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.role.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						users: {
							connect: usersConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.role.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					users: {
						connect: usersConnections,
						disconnect: usersDisconnections,
					},
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {}

	static async deleteAll(
		query: Parameters<typeof _Role.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Role.prisma.deleteMany(query)).count
		} catch (e) {
			console.log(e)
			return false
		}
		return count
	}

	async delete(): Promise<boolean> {
		if (this.primaryKey === -1) return false

		try {
			await this.prisma.delete({
				where: { id: this._id },
			})
			this._id = -1
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}
}
