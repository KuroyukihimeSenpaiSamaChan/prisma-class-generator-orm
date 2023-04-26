import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _AccessToken extends PrismaClass {
	static prisma: Prisma.AccessTokenDelegate<undefined>
	get prisma(): Prisma.AccessTokenDelegate<undefined> {
		return _AccessToken.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.AccessTokenInclude {
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
	private _id: number
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	private user_id: ForeignKey

	token?: string

	created_at?: number

	expires_at?: number

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
		created_at?: number | null
		expires_at?: number | null
		user?: _User | User | ForeignKey
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _AccessToken>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.token = obj.token
		this.created_at = obj.created_at !== null ? obj.created_at : undefined
		this.expires_at = obj.expires_at !== null ? obj.expires_at : undefined

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
			created_at: this.created_at,
			expires_at: this.expires_at,
			user: this.user,
		}
	}

	static async all(
		query: Prisma.AccessTokenFindFirstArgsBase,
	): Promise<_AccessToken[]> {
		const models = await _AccessToken.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _AccessToken(m))
			return acc
		}, [] as _AccessToken[])
	}

	static async from<F extends Prisma.AccessTokenWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.AccessTokenFindUniqueArgsBase, 'where'>,
	): Promise<_AccessToken | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _AccessToken.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _AccessToken.getIncludes()
		}

		const dbQuery = await _AccessToken.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _AccessToken(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _AccessToken.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _AccessToken.getIncludes(depth),
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
					console.log('First YIELD')
					await saveYield.next()
					console.log('Second YIELD')
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		//
		if (this.id === undefined) {
			throw new Error('Invalid field on _AccessToken.save(): id')
		}

		if (this.token === undefined) {
			throw new Error('Invalid field on _AccessToken.save(): token')
		}

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// toOne
		// if (this.media !== null && typeof this.media !== 'number') {
		//   const mediaYield = this.media.saveToTransaction(tx)
		//   await mediaYield.next()
		//   saveYieldsArray.push(mediaYield)
		// }

		// toMany
		// const galleryYield = this.gallery.saveToTransaction(tx)
		// galleryYield.next()
		// saveYieldsArray.push(galleryYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			saveYield.next()
		}

		return new Promise<number>((resolve) => resolve(1))
	}
}
