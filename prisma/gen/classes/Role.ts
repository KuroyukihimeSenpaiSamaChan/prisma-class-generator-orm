import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Role extends PrismaClass {
	static prisma: Prisma.RoleDelegate<undefined>
	get prisma(): Prisma.RoleDelegate<undefined> {
		return _Role.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.RoleInclude {
		if (deep <= 0) {
			return {
				users: true,
			}
		}

		return {
			users: { include: _User.getIncludes(deep - 1) },
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

	label?: string

	private _users: RelationMany<_User>
	public get users(): RelationMany<_User> {
		return this._users
	}
	private set users(value: RelationMany<_User>) {
		this._users = value
	}

	constructor(obj: {
		id?: number
		label?: string

		users?: _User[] | User[] | RelationMany<_User>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Role>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.label = obj.label

		if (!obj.users || obj.users.length === 0) {
			this.users = new RelationMany<_User>([])
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

	update(obj: { id?: number; label?: string }) {
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

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Role.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Role.getIncludes(depth),
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
					},
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.label === undefined) {
			throw new Error('Missing field on _Role.save(): label')
		}
	}

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
