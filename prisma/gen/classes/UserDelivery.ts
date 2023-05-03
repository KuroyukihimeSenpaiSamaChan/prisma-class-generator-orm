import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _UserDelivery extends PrismaClass {
	static prisma: Prisma.UserDeliveryDelegate<undefined>
	get prisma(): Prisma.UserDeliveryDelegate<undefined> {
		return _UserDelivery.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		depth: number = 0,
		filter?: {
			user?: boolean | Parameters<typeof _User.getIncludes>[1]
		},
	): Prisma.UserDeliveryInclude {
		if (filter === undefined) {
			if (depth <= 0) {
				return {
					user: true,
				}
			}
			return {
				user: { include: _User.getIncludes(depth - 1) },
			}
		} else {
			if (depth <= 0) {
				return {
					user: Object.keys(filter).includes('user')
						? true
						: undefined,
				}
			}
			return {
				user: Object.keys(filter).includes('user')
					? {
							include: _User.getIncludes(
								depth - 1,
								typeof filter.user === 'boolean'
									? undefined
									: filter.user,
							),
					  }
					: undefined,
			}
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

	private _user_id: ForeignKey

	address?: string

	additional_address?: string | null

	zipcode?: string

	city?: string

	country?: string

	region?: string

	phone_number?: string

	company_name?: string | null

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this._user_id = value.id
		} else {
			this._user = null
			this._user_id = value
		}
	}
	get user_id(): ForeignKey {
		if (this._user === null) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	constructor(obj: {
		id?: number
		user_id?: ForeignKey
		address?: string
		additional_address?: string | null
		zipcode?: string
		city?: string
		country?: string
		region?: string
		phone_number?: string
		company_name?: string | null
		user?: _User | User | ForeignKey
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _UserDelivery>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.address = obj.address
		this.additional_address =
			obj.additional_address !== null ? obj.additional_address : undefined
		this.zipcode = obj.zipcode
		this.city = obj.city
		this.country = obj.country
		this.region = obj.region
		this.phone_number = obj.phone_number
		this.company_name =
			obj.company_name !== null ? obj.company_name : undefined

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

	update(obj: {
		id?: number
		user_id?: ForeignKey
		address?: string
		additional_address?: string | null
		zipcode?: string
		city?: string
		country?: string
		region?: string
		phone_number?: string
		company_name?: string | null
	}) {
		if (obj.address !== undefined) {
			this.address = obj.address
		}
		if (obj.additional_address !== undefined) {
			this.additional_address = obj.additional_address
		}
		if (obj.zipcode !== undefined) {
			this.zipcode = obj.zipcode
		}
		if (obj.city !== undefined) {
			this.city = obj.city
		}
		if (obj.country !== undefined) {
			this.country = obj.country
		}
		if (obj.region !== undefined) {
			this.region = obj.region
		}
		if (obj.phone_number !== undefined) {
			this.phone_number = obj.phone_number
		}
		if (obj.company_name !== undefined) {
			this.company_name = obj.company_name
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			address: this.address,
			additional_address: this.additional_address,
			zipcode: this.zipcode,
			city: this.city,
			country: this.country,
			region: this.region,
			phone_number: this.phone_number,
			company_name: this.company_name,
			user: this.user,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_id: this.user_id!,
			address: this.address!,
			additional_address: this.additional_address!,
			zipcode: this.zipcode!,
			city: this.city!,
			country: this.country!,
			region: this.region!,
			phone_number: this.phone_number!,
			company_name: this.company_name!,
		}
	}

	static async all(
		query?: Prisma.UserDeliveryFindFirstArgsBase,
	): Promise<_UserDelivery[]> {
		const models = await _UserDelivery.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _UserDelivery(m))
			return acc
		}, [] as _UserDelivery[])
	}

	static async from(
		query?: Prisma.UserDeliveryFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_UserDelivery | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _UserDelivery.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _UserDelivery.getIncludes()
			}
		}

		const dbQuery = await _UserDelivery.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserDelivery(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _UserDelivery.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelivery.getIncludes(depth),
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
		if (typeof this.user !== 'number' && !this.user!.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.userDelivery.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.userDelivery.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.address === undefined) {
			throw new Error('Missing field on _UserDelivery.save(): address')
		}
		if (this.zipcode === undefined) {
			throw new Error('Missing field on _UserDelivery.save(): zipcode')
		}
		if (this.city === undefined) {
			throw new Error('Missing field on _UserDelivery.save(): city')
		}
		if (this.country === undefined) {
			throw new Error('Missing field on _UserDelivery.save(): country')
		}
		if (this.region === undefined) {
			throw new Error('Missing field on _UserDelivery.save(): region')
		}
		if (this.phone_number === undefined) {
			throw new Error(
				'Missing field on _UserDelivery.save(): phone_number',
			)
		}

		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _UserDelivery.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _UserDelivery.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _UserDelivery.prisma.deleteMany(query)).count
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
