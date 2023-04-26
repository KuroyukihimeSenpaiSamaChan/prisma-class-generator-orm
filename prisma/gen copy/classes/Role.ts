import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Role implements PrismaClass {
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
	id: number = -1

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
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Role>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
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

	toJSON() {
		return { id: this.id, label: this.label, users: this.users }
	}

	static async all(query: Prisma.RoleFindFirstArgsBase): Promise<_Role[]> {
		const models = await _Role.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Role(m))
			return acc
		}, [] as _Role[])
	}

	static async from<F extends Prisma.RoleWhereInput>(
		where: F,
		opt?: Omit<Prisma.RoleFindFirstArgsBase, 'where'>,
	): Promise<_Role | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _Role.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _Role.getIncludes()
		}

		const dbQuery = await _Role.prisma.findFirst({
			where: where,
			...opt,
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
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}
}
