import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _UserDelete implements PrismaClass {
	static prisma: Prisma.UserDeleteDelegate<undefined>
	get prisma(): Prisma.UserDeleteDelegate<undefined> {
		return _UserDelete.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.UserDeleteInclude {
		if (deep <= 0) {
			return {
				user: true,
			}
		}

		return {
			user: { include: _User.getIncludes(deep - 1) },
		}
	}

	// ID
	id: number = -1

	private user_id: ForeignKey

	token?: string

	date?: number

	validated?: boolean = false

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this.user_id = value.id
		} else {
			this._user = null
			this.user_id = value
		}
	}

	constructor(obj: {
		id?: number
		user_id?: ForeignKey
		token?: string
		date?: number
		validated?: boolean
		user?: _User | User | ForeignKey
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _UserDelete>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
		}
		this.token = obj.token
		this.date = obj.date
		this.validated = obj.validated

		if (!obj.user) {
			if (obj.user_id === undefined) {
				this.user = null
			} else {
				this.user = obj.user_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			token: this.token,
			date: this.date,
			validated: this.validated,
			user: this.user,
		}
	}

	static async all(
		query: Prisma.UserDeleteFindFirstArgsBase,
	): Promise<_UserDelete[]> {
		const models = await _UserDelete.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _UserDelete(m))
			return acc
		}, [] as _UserDelete[])
	}

	static async from<F extends Prisma.UserDeleteWhereInput>(
		where: F,
		opt?: Omit<Prisma.UserDeleteFindFirstArgsBase, 'where'>,
	): Promise<_UserDelete | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _UserDelete.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _UserDelete.getIncludes()
		}

		const dbQuery = await _UserDelete.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _UserDelete(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _UserDelete.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelete.getIncludes(depth),
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
