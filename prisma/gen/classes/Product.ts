import { _Media } from './Media'
import { _TVAType } from './TVAType'
import { _User } from './User'
import { _ProductState } from './ProductState'
import { _ProductVisibilty } from './ProductVisibilty'
import { _ConditioningType } from './ConditioningType'
import { _SubOrder } from './SubOrder'
import { _ProductCategory } from './ProductCategory'
import {
	Prisma,
	Media,
	TVAType,
	User,
	ProductState,
	ProductVisibilty,
	ConditioningType,
	SubOrder,
	ProductCategory,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Product implements PrismaClass {
	static prisma: Prisma.ProductDelegate<undefined>
	get prisma(): Prisma.ProductDelegate<undefined> {
		return _Product.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		param?:
			| number
			| {
					media?:
						| boolean
						| Exclude<
								Parameters<typeof _Media.getIncludes>[0],
								number
						  >
					tva_type?:
						| boolean
						| Exclude<
								Parameters<typeof _TVAType.getIncludes>[0],
								number
						  >
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
					productState?:
						| boolean
						| Exclude<
								Parameters<typeof _ProductState.getIncludes>[0],
								number
						  >
					productVisibilty?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ProductVisibilty.getIncludes
								>[0],
								number
						  >
					productConditioning?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ConditioningType.getIncludes
								>[0],
								number
						  >
					sub_orders?:
						| boolean
						| Exclude<
								Parameters<typeof _SubOrder.getIncludes>[0],
								number
						  >
					product_categories?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ProductCategory.getIncludes
								>[0],
								number
						  >
					gallery?:
						| boolean
						| Exclude<
								Parameters<typeof _Media.getIncludes>[0],
								number
						  >
			  },
	): Prisma.ProductInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					media: true,
					tva_type: true,
					user: true,
					productState: true,
					productVisibilty: true,
					productConditioning: true,
					sub_orders: true,
					product_categories: true,
					gallery: true,
				}
			}
			return {
				media: { include: _Media.getIncludes(param - 1) },
				tva_type: { include: _TVAType.getIncludes(param - 1) },
				user: { include: _User.getIncludes(param - 1) },
				productState: { include: _ProductState.getIncludes(param - 1) },
				productVisibilty: {
					include: _ProductVisibilty.getIncludes(param - 1),
				},
				productConditioning: {
					include: _ConditioningType.getIncludes(param - 1),
				},
				sub_orders: { include: _SubOrder.getIncludes(param - 1) },
				product_categories: {
					include: _ProductCategory.getIncludes(param - 1),
				},
				gallery: { include: _Media.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			return {
				media: Object.keys(param).includes('media')
					? typeof param.media === 'boolean'
						? true
						: {
								include: _Media.getIncludes(param.media),
						  }
					: undefined,
				tva_type: Object.keys(param).includes('tva_type')
					? typeof param.tva_type === 'boolean'
						? true
						: {
								include: _TVAType.getIncludes(param.tva_type),
						  }
					: undefined,
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
				productState: Object.keys(param).includes('productState')
					? typeof param.productState === 'boolean'
						? true
						: {
								include: _ProductState.getIncludes(
									param.productState,
								),
						  }
					: undefined,
				productVisibilty: Object.keys(param).includes(
					'productVisibilty',
				)
					? typeof param.productVisibilty === 'boolean'
						? true
						: {
								include: _ProductVisibilty.getIncludes(
									param.productVisibilty,
								),
						  }
					: undefined,
				productConditioning: Object.keys(param).includes(
					'productConditioning',
				)
					? typeof param.productConditioning === 'boolean'
						? true
						: {
								include: _ConditioningType.getIncludes(
									param.productConditioning,
								),
						  }
					: undefined,
				sub_orders: Object.keys(param).includes('sub_orders')
					? typeof param.sub_orders === 'boolean'
						? true
						: {
								include: _SubOrder.getIncludes(
									param.sub_orders,
								),
						  }
					: undefined,
				product_categories: Object.keys(param).includes(
					'product_categories',
				)
					? typeof param.product_categories === 'boolean'
						? true
						: {
								include: _ProductCategory.getIncludes(
									param.product_categories,
								),
						  }
					: undefined,
				gallery: Object.keys(param).includes('gallery')
					? typeof param.gallery === 'boolean'
						? true
						: {
								include: _Media.getIncludes(param.gallery),
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

	private _vendor_id: ForeignKey

	private _state: ForeignKey = 1

	private _tva: ForeignKey

	product_name: string

	vendor_sku: string

	product_sku: string

	price: number

	price_promo: number

	description: string

	additional_description: string | null

	backorder: boolean

	linked_products: string

	private _product_image: ForeignKey

	product_keywords: string

	creation_date: number

	modification_date: number

	has_tva: boolean

	private _visibility: ForeignKey = 1

	private _conditioningType: ForeignKey

	conditioningValue: string

	private _media: _Media
	get media(): _Media {
		return this._media
	}
	set media(value: _Media) {
		this._media = value
		this._product_image = value.id
	}
	get product_image(): ForeignKey {
		if (this._media === null) {
			return this._product_image
		} else {
			return this._media.primaryKey
		}
	}

	private _tva_type: _TVAType
	get tva_type(): _TVAType {
		return this._tva_type
	}
	set tva_type(value: _TVAType) {
		this._tva_type = value
		this._tva = value.id
	}
	get tva(): ForeignKey {
		if (this._tva_type === null) {
			return this._tva
		} else {
			return this._tva_type.primaryKey
		}
	}

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._vendor_id = value.id
	}
	get vendor_id(): ForeignKey {
		if (this._user === null) {
			return this._vendor_id
		} else {
			return this._user.primaryKey
		}
	}

	private _productState: _ProductState
	get productState(): _ProductState {
		return this._productState
	}
	set productState(value: _ProductState) {
		this._productState = value
		this._state = value.id
	}
	get state(): ForeignKey {
		if (this._productState === null) {
			return this._state
		} else {
			return this._productState.primaryKey
		}
	}

	private _productVisibilty: _ProductVisibilty
	get productVisibilty(): _ProductVisibilty {
		return this._productVisibilty
	}
	set productVisibilty(value: _ProductVisibilty) {
		this._productVisibilty = value
		this._visibility = value.id
	}
	get visibility(): ForeignKey {
		if (this._productVisibilty === null) {
			return this._visibility
		} else {
			return this._productVisibilty.primaryKey
		}
	}

	private _productConditioning: _ConditioningType
	get productConditioning(): _ConditioningType {
		return this._productConditioning
	}
	set productConditioning(value: _ConditioningType) {
		this._productConditioning = value
		this._conditioningType = value.id
	}
	get conditioningType(): ForeignKey {
		if (this._productConditioning === null) {
			return this._conditioningType
		} else {
			return this._productConditioning.primaryKey
		}
	}

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	private _product_categories: RelationMany<_ProductCategory>
	public get product_categories(): RelationMany<_ProductCategory> {
		return this._product_categories
	}
	private set product_categories(value: RelationMany<_ProductCategory>) {
		this._product_categories = value
	}

	private _gallery: RelationMany<_Media>
	public get gallery(): RelationMany<_Media> {
		return this._gallery
	}
	private set gallery(value: RelationMany<_Media>) {
		this._gallery = value
	}

	constructor(obj: {
		id?: number
		vendor_id: ForeignKey
		state?: ForeignKey
		tva: ForeignKey
		product_name: string
		vendor_sku: string
		product_sku: string
		price: number
		price_promo: number
		description: string
		additional_description: string | null
		backorder: boolean
		linked_products: string
		product_image: ForeignKey
		product_keywords: string
		creation_date: number
		modification_date: number
		has_tva: boolean
		visibility?: ForeignKey
		conditioningType: ForeignKey
		conditioningValue: string
		media?: _Media | Media
		tva_type?: _TVAType | TVAType
		user?: _User | User
		productState?: _ProductState | ProductState
		productVisibilty?: _ProductVisibilty | ProductVisibilty
		productConditioning?: _ConditioningType | ConditioningType
		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
		product_categories?:
			| _ProductCategory[]
			| ProductCategory[]
			| RelationMany<_ProductCategory>
		gallery?: _Media[] | Media[] | RelationMany<_Media>
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Product>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.product_name = obj.product_name
		this.vendor_sku = obj.vendor_sku
		this.product_sku = obj.product_sku
		this.price = obj.price
		this.price_promo = obj.price_promo
		this.description = obj.description
		this.additional_description = obj.additional_description
		this.backorder = obj.backorder
		this.linked_products = obj.linked_products
		this.product_keywords = obj.product_keywords
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date
		this.has_tva = obj.has_tva
		this.conditioningValue = obj.conditioningValue

		if (obj.media !== undefined) {
			if (obj.media instanceof _Media) {
				this.media = obj.media
			} else {
				this.media = new _Media(obj.media)
			}
		} else if (obj.product_image !== undefined) {
			this._product_image = obj.product_image
		} else throw new Error('Invalid constructor.')

		if (obj.tva_type !== undefined) {
			if (obj.tva_type instanceof _TVAType) {
				this.tva_type = obj.tva_type
			} else {
				this.tva_type = new _TVAType(obj.tva_type)
			}
		} else if (obj.tva !== undefined) {
			this._tva = obj.tva
		} else throw new Error('Invalid constructor.')

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.vendor_id !== undefined) {
			this._vendor_id = obj.vendor_id
		} else throw new Error('Invalid constructor.')

		if (obj.productState !== undefined) {
			if (obj.productState instanceof _ProductState) {
				this.productState = obj.productState
			} else {
				this.productState = new _ProductState(obj.productState)
			}
		} else if (obj.state !== undefined) {
			this._state = obj.state
		} else throw new Error('Invalid constructor.')

		if (obj.productVisibilty !== undefined) {
			if (obj.productVisibilty instanceof _ProductVisibilty) {
				this.productVisibilty = obj.productVisibilty
			} else {
				this.productVisibilty = new _ProductVisibilty(
					obj.productVisibilty,
				)
			}
		} else if (obj.visibility !== undefined) {
			this._visibility = obj.visibility
		} else throw new Error('Invalid constructor.')

		if (obj.productConditioning !== undefined) {
			if (obj.productConditioning instanceof _ConditioningType) {
				this.productConditioning = obj.productConditioning
			} else {
				this.productConditioning = new _ConditioningType(
					obj.productConditioning,
				)
			}
		} else if (obj.conditioningType !== undefined) {
			this._conditioningType = obj.conditioningType
		} else throw new Error('Invalid constructor.')

		if (!obj.sub_orders || obj.sub_orders.length === 0) {
			this.sub_orders = new RelationMany<_SubOrder>()
		} else if (obj.sub_orders instanceof RelationMany) {
			this.sub_orders = obj.sub_orders
		} else if (obj.sub_orders[0] instanceof _SubOrder) {
			this.sub_orders = new RelationMany<_SubOrder>(
				obj.sub_orders as _SubOrder[],
			)
		} else {
			const sub_ordersArray: _SubOrder[] = []
			for (const value of obj.sub_orders as SubOrder[]) {
				sub_ordersArray.push(new _SubOrder(value))
			}
			this.sub_orders = new RelationMany<_SubOrder>(sub_ordersArray)
		}

		if (!obj.product_categories || obj.product_categories.length === 0) {
			this.product_categories = new RelationMany<_ProductCategory>()
		} else if (obj.product_categories instanceof RelationMany) {
			this.product_categories = obj.product_categories
		} else if (obj.product_categories[0] instanceof _ProductCategory) {
			this.product_categories = new RelationMany<_ProductCategory>(
				obj.product_categories as _ProductCategory[],
			)
		} else {
			const product_categoriesArray: _ProductCategory[] = []
			for (const value of obj.product_categories as ProductCategory[]) {
				product_categoriesArray.push(new _ProductCategory(value))
			}
			this.product_categories = new RelationMany<_ProductCategory>(
				product_categoriesArray,
			)
		}

		if (!obj.gallery || obj.gallery.length === 0) {
			this.gallery = new RelationMany<_Media>()
		} else if (obj.gallery instanceof RelationMany) {
			this.gallery = obj.gallery
		} else if (obj.gallery[0] instanceof _Media) {
			this.gallery = new RelationMany<_Media>(obj.gallery as _Media[])
		} else {
			const galleryArray: _Media[] = []
			for (const value of obj.gallery as Media[]) {
				galleryArray.push(new _Media(value))
			}
			this.gallery = new RelationMany<_Media>(galleryArray)
		}
	}

	update(obj: {
		product_name?: string
		vendor_sku?: string
		product_sku?: string
		price?: number
		price_promo?: number
		description?: string
		additional_description?: string
		backorder?: boolean
		linked_products?: string
		product_keywords?: string
		creation_date?: number
		modification_date?: number
		has_tva?: boolean
		conditioningValue?: string
	}) {
		if (obj.product_name !== undefined) {
			this.product_name = obj.product_name
		}
		if (obj.vendor_sku !== undefined) {
			this.vendor_sku = obj.vendor_sku
		}
		if (obj.product_sku !== undefined) {
			this.product_sku = obj.product_sku
		}
		if (obj.price !== undefined) {
			this.price = obj.price
		}
		if (obj.price_promo !== undefined) {
			this.price_promo = obj.price_promo
		}
		if (obj.description !== undefined) {
			this.description = obj.description
		}
		if (obj.additional_description !== undefined) {
			this.additional_description = obj.additional_description
		}
		if (obj.backorder !== undefined) {
			this.backorder = obj.backorder
		}
		if (obj.linked_products !== undefined) {
			this.linked_products = obj.linked_products
		}
		if (obj.product_keywords !== undefined) {
			this.product_keywords = obj.product_keywords
		}
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
		if (obj.has_tva !== undefined) {
			this.has_tva = obj.has_tva
		}
		if (obj.conditioningValue !== undefined) {
			this.conditioningValue = obj.conditioningValue
		}
	}

	toJSON() {
		return {
			id: this.id,
			vendor_id: this.vendor_id,
			state: this.state,
			tva: this.tva,
			product_name: this.product_name,
			vendor_sku: this.vendor_sku,
			product_sku: this.product_sku,
			price: this.price,
			price_promo: this.price_promo,
			description: this.description,
			additional_description: this.additional_description,
			backorder: this.backorder,
			linked_products: this.linked_products,
			product_image: this.product_image,
			product_keywords: this.product_keywords,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			has_tva: this.has_tva,
			visibility: this.visibility,
			conditioningType: this.conditioningType,
			conditioningValue: this.conditioningValue,
			media: this.media,
			tva_type: this.tva_type,
			user: this.user,
			productState: this.productState,
			productVisibilty: this.productVisibilty,
			productConditioning: this.productConditioning,
			sub_orders: this.sub_orders,
			product_categories: this.product_categories,
			gallery: this.gallery,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			vendor_id: this.vendor_id!,
			state: this.state!,
			tva: this.tva!,
			product_name: this.product_name!,
			vendor_sku: this.vendor_sku!,
			product_sku: this.product_sku!,
			price: this.price!,
			price_promo: this.price_promo!,
			description: this.description!,
			additional_description: this.additional_description!,
			backorder: this.backorder!,
			linked_products: this.linked_products!,
			product_image: this.product_image!,
			product_keywords: this.product_keywords!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
			has_tva: this.has_tva!,
			visibility: this.visibility!,
			conditioningType: this.conditioningType!,
			conditioningValue: this.conditioningValue!,
		}
	}

	static async all(
		query?: Prisma.ProductFindFirstArgsBase,
	): Promise<_Product[]> {
		const models = await _Product.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Product(m))
			return acc
		}, [] as _Product[])
	}

	static async from(
		query?: Prisma.ProductFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Product | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Product.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Product.getIncludes()
			}
		}

		const dbQuery = await _Product.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Product(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Product.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Product.getIncludes>[0], number>,
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
			const dbThis = await _Product.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Product.getIncludes(param),
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
		if (typeof this.media !== 'number' && !this.media!.saving) {
			const mediaYield = this.media!.saveToTransaction(tx)
			await mediaYield.next()
			saveYieldsArray.push(mediaYield)
		}

		if (typeof this.tva_type !== 'number' && !this.tva_type!.saving) {
			const tva_typeYield = this.tva_type!.saveToTransaction(tx)
			await tva_typeYield.next()
			saveYieldsArray.push(tva_typeYield)
		}

		if (typeof this.user !== 'number' && !this.user!.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		if (
			typeof this.productState !== 'number' &&
			!this.productState!.saving
		) {
			const productStateYield = this.productState!.saveToTransaction(tx)
			await productStateYield.next()
			saveYieldsArray.push(productStateYield)
		}

		if (
			typeof this.productVisibilty !== 'number' &&
			!this.productVisibilty!.saving
		) {
			const productVisibiltyYield =
				this.productVisibilty!.saveToTransaction(tx)
			await productVisibiltyYield.next()
			saveYieldsArray.push(productVisibiltyYield)
		}

		if (
			typeof this.productConditioning !== 'number' &&
			!this.productConditioning!.saving
		) {
			const productConditioningYield =
				this.productConditioning!.saveToTransaction(tx)
			await productConditioningYield.next()
			saveYieldsArray.push(productConditioningYield)
		}

		// Relations toMany
		const sub_ordersYield = this.sub_orders!.saveToTransaction(tx)
		await sub_ordersYield.next()
		saveYieldsArray.push(sub_ordersYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		const product_categoriesConnections: Prisma.Enumerable<Prisma.ProductCategoryWhereUniqueInput> =
			[]
		for (const relation of this.product_categories) {
			product_categoriesConnections.push({
				id: relation.primaryKey,
			})
		}
		const product_categoriesDisconnections: Prisma.Enumerable<Prisma.ProductCategoryWhereUniqueInput> =
			[]
		for (const relation of this.product_categories.toRemoveRelations) {
			product_categoriesConnections.push({
				id: relation.primaryKey,
			})
		}

		const galleryConnections: Prisma.Enumerable<Prisma.MediaWhereUniqueInput> =
			[]
		for (const relation of this.gallery) {
			galleryConnections.push({
				id: relation.primaryKey,
			})
		}
		const galleryDisconnections: Prisma.Enumerable<Prisma.MediaWhereUniqueInput> =
			[]
		for (const relation of this.gallery.toRemoveRelations) {
			galleryConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.product.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						product_categories: {
							connect: product_categoriesConnections,
						},
						gallery: {
							connect: galleryConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.product.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					product_categories: {
						connect: product_categoriesConnections,
						disconnect: product_categoriesDisconnections,
					},
					gallery: {
						connect: galleryConnections,
						disconnect: galleryDisconnections,
					},
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.product_name === undefined) {
			throw new Error('Missing field on _Product.save(): product_name')
		}
		if (this.vendor_sku === undefined) {
			throw new Error('Missing field on _Product.save(): vendor_sku')
		}
		if (this.product_sku === undefined) {
			throw new Error('Missing field on _Product.save(): product_sku')
		}
		if (this.price === undefined) {
			throw new Error('Missing field on _Product.save(): price')
		}
		if (this.price_promo === undefined) {
			throw new Error('Missing field on _Product.save(): price_promo')
		}
		if (this.description === undefined) {
			throw new Error('Missing field on _Product.save(): description')
		}
		if (this.backorder === undefined) {
			throw new Error('Missing field on _Product.save(): backorder')
		}
		if (this.linked_products === undefined) {
			throw new Error('Missing field on _Product.save(): linked_products')
		}
		if (this.product_keywords === undefined) {
			throw new Error(
				'Missing field on _Product.save(): product_keywords',
			)
		}
		if (this.creation_date === undefined) {
			throw new Error('Missing field on _Product.save(): creation_date')
		}
		if (this.modification_date === undefined) {
			throw new Error(
				'Missing field on _Product.save(): modification_date',
			)
		}
		if (this.has_tva === undefined) {
			throw new Error('Missing field on _Product.save(): has_tva')
		}
		if (this.conditioningValue === undefined) {
			throw new Error(
				'Missing field on _Product.save(): conditioningValue',
			)
		}

		if (this.media === undefined || this.media === null) {
			throw new Error("media can't be null or undefined in _Product.")
		}
		if (this.tva_type === undefined || this.tva_type === null) {
			throw new Error("tva_type can't be null or undefined in _Product.")
		}
		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _Product.")
		}
		if (this.productState === undefined || this.productState === null) {
			throw new Error(
				"productState can't be null or undefined in _Product.",
			)
		}
		if (
			this.productVisibilty === undefined ||
			this.productVisibilty === null
		) {
			throw new Error(
				"productVisibilty can't be null or undefined in _Product.",
			)
		}
		if (
			this.productConditioning === undefined ||
			this.productConditioning === null
		) {
			throw new Error(
				"productConditioning can't be null or undefined in _Product.",
			)
		}

		if (this.sub_orders.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Product. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Product.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Product.prisma.deleteMany(query)).count
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
