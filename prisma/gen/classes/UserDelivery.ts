import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _UserDeliveryConstructor<
	userType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	address: string
	additional_address?: string | null
	zipcode: string
	city: string
	country: string
	region: string
	phone_number: string
	company_name?: string | null
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _UserDelivery implements PrismaClass {
	static prisma: Prisma.UserDeliveryDelegate<undefined>
	get prisma(): Prisma.UserDeliveryDelegate<undefined> {
		return _UserDelivery.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	private _isSaved = false
	get isSaved(): boolean {
		return this._isSaved
	}

	static getIncludes(
		param?:
			| number
			| {
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
			  },
	): Prisma.UserDeliveryInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					user: true,
				}
			}
			return {
				user: { include: _User.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			const query = {
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) =>
					query[key as keyof typeof query] === undefined &&
					delete query[key as keyof typeof query],
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

	private _user_id: ForeignKey
	set user_id(value: ForeignKey) {
		this._user_id = value
		this._isSaved = false
	}

	private _address: string
	set address(value: string) {
		this._address = value
		this._isSaved = false
	}
	get address(): string {
		return this._address
	}

	private _additional_address: string | null
	set additional_address(value: string | null) {
		this._additional_address = value
		this._isSaved = false
	}
	get additional_address(): string | null {
		return this._additional_address
	}

	private _zipcode: string
	set zipcode(value: string) {
		this._zipcode = value
		this._isSaved = false
	}
	get zipcode(): string {
		return this._zipcode
	}

	private _city: string
	set city(value: string) {
		this._city = value
		this._isSaved = false
	}
	get city(): string {
		return this._city
	}

	private _country: string
	set country(value: string) {
		this._country = value
		this._isSaved = false
	}
	get country(): string {
		return this._country
	}

	private _region: string
	set region(value: string) {
		this._region = value
		this._isSaved = false
	}
	get region(): string {
		return this._region
	}

	private _phone_number: string
	set phone_number(value: string) {
		this._phone_number = value
		this._isSaved = false
	}
	get phone_number(): string {
		return this._phone_number
	}

	private _company_name: string | null
	set company_name(value: string | null) {
		this._company_name = value
		this._isSaved = false
	}
	get company_name(): string | null {
		return this._company_name
	}

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._user_id = value.id
		this._isSaved = false
	}
	get user_id(): ForeignKey {
		if (!this._user) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	constructor(obj: _UserDeliveryConstructor) {
		this.init(obj)
	}

	private init(obj: _UserDeliveryConstructor) {
		this._address = obj.address
		this._additional_address = obj.additional_address ?? null
		this._zipcode = obj.zipcode
		this._city = obj.city
		this._country = obj.country
		this._region = obj.region
		this._phone_number = obj.phone_number
		this._company_name = obj.company_name ?? null

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: {
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
	): Promise<_UserDelivery | null> {
		const dbQuery = await _UserDelivery.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserDelivery(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _UserDelivery.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _UserDelivery.getIncludes>[0], number>,
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
			const dbThis = await _UserDelivery.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelivery.getIncludes(param),
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
		if (this.user && !this.user.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		let areRelationsSaved = true

		if (this._isSaved && areRelationsSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
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
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {}

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
