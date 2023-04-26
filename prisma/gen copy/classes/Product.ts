import { _Media } from './Media'
import { _TVAType } from './TVAType'
import { _User } from './User'
import { _ProductState } from './ProductState'
import { _ProductVisibilty } from './ProductVisibilty'
import { _SubOrder } from './SubOrder'
import { _ProductCategory } from './ProductCategory'
import {
	Prisma,
	Media,
	TVAType,
	User,
	ProductState,
	ProductVisibilty,
	SubOrder,
	ProductCategory,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Product extends PrismaClass {
	static prisma: Prisma.ProductDelegate<undefined>
	get prisma(): Prisma.ProductDelegate<undefined> {
		return _Product.prisma
	}
	private get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.ProductInclude {
		if (deep <= 0) {
			return {
				media: true,
				tva_type: true,
				user: true,
				productState: true,
				productVisibilty: true,
				sub_orders: true,
				product_categories: true,
				gallery: true,
			}
		}

		return {
			media: { include: _Media.getIncludes(deep - 1) },
			tva_type: { include: _TVAType.getIncludes(deep - 1) },
			user: { include: _User.getIncludes(deep - 1) },
			productState: { include: _ProductState.getIncludes(deep - 1) },
			productVisibilty: {
				include: _ProductVisibilty.getIncludes(deep - 1),
			},
			sub_orders: { include: _SubOrder.getIncludes(deep - 1) },
			product_categories: {
				include: _ProductCategory.getIncludes(deep - 1),
			},
			gallery: { include: _Media.getIncludes(deep - 1) },
		}
	}

	// ID
	id: number = -1

	private vendor_id: ForeignKey

	private state: ForeignKey = 1

	private tva: ForeignKey

	product_name?: string

	vendor_sku?: string

	product_sku?: string

	price?: number

	price_promo?: number

	description?: string

	additional_description?: string

	backorder?: boolean

	unique_product?: boolean

	linked_products?: string

	private product_image: ForeignKey

	product_keywords?: string

	creation_date?: number

	modification_date?: number

	has_tva?: boolean

	private visibility: ForeignKey = 1

	private _media: _Media | null
	get media(): _Media | ForeignKey {
		return this._media ? this._media : this.product_image
	}
	set media(value: _Media | ForeignKey) {
		if (value instanceof _Media) {
			this._media = value
			this.product_image = value.id
		} else {
			this._media = null
			this.product_image = value
		}
	}

	private _tva_type: _TVAType | null
	get tva_type(): _TVAType | ForeignKey {
		return this._tva_type ? this._tva_type : this.tva
	}
	set tva_type(value: _TVAType | ForeignKey) {
		if (value instanceof _TVAType) {
			this._tva_type = value
			this.tva = value.id
		} else {
			this._tva_type = null
			this.tva = value
		}
	}

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.vendor_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this.vendor_id = value.id
		} else {
			this._user = null
			this.vendor_id = value
		}
	}

	private _productState: _ProductState | null
	get productState(): _ProductState | ForeignKey {
		return this._productState ? this._productState : this.state
	}
	set productState(value: _ProductState | ForeignKey) {
		if (value instanceof _ProductState) {
			this._productState = value
			this.state = value.id
		} else {
			this._productState = null
			this.state = value
		}
	}

	private _productVisibilty: _ProductVisibilty | null
	get productVisibilty(): _ProductVisibilty | ForeignKey {
		return this._productVisibilty ? this._productVisibilty : this.visibility
	}
	set productVisibilty(value: _ProductVisibilty | ForeignKey) {
		if (value instanceof _ProductVisibilty) {
			this._productVisibilty = value
			this.visibility = value.id
		} else {
			this._productVisibilty = null
			this.visibility = value
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
		vendor_id?: ForeignKey
		state?: ForeignKey
		tva?: ForeignKey
		product_name?: string
		vendor_sku?: string
		product_sku?: string
		price?: number
		price_promo?: number
		description?: string
		additional_description?: string | null
		backorder?: boolean
		unique_product?: boolean
		linked_products?: string
		product_image?: ForeignKey
		product_keywords?: string
		creation_date?: number
		modification_date?: number
		has_tva?: boolean
		visibility?: ForeignKey
		media?: _Media | Media | ForeignKey
		tva_type?: _TVAType | TVAType | ForeignKey
		user?: _User | User | ForeignKey
		productState?: _ProductState | ProductState | ForeignKey
		productVisibilty?: _ProductVisibilty | ProductVisibilty | ForeignKey
		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
		product_categories?:
		| _ProductCategory[]
		| ProductCategory[]
		| RelationMany<_ProductCategory>
		gallery?: _Media[] | Media[] | RelationMany<_Media>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Product>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
		}
		this.product_name = obj.product_name
		this.vendor_sku = obj.vendor_sku
		this.product_sku = obj.product_sku
		this.price = obj.price
		this.price_promo = obj.price_promo
		this.description = obj.description
		this.additional_description =
			obj.additional_description !== null
				? obj.additional_description
				: undefined
		this.backorder = obj.backorder
		this.unique_product = obj.unique_product
		this.linked_products = obj.linked_products
		this.product_keywords = obj.product_keywords
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date
		this.has_tva = obj.has_tva

		if (!obj.media) {
			if (obj.product_image === undefined) {
				this.media = null
			} else {
				this.media = obj.product_image
			}
		} else if (obj.media instanceof _Media) {
			this.media = obj.media
		} else if (typeof obj.media === 'number') {
			this.media = obj.media
		} else {
			this.media = new _Media(obj.media)
		}

		if (!obj.tva_type) {
			if (obj.tva === undefined) {
				this.tva_type = null
			} else {
				this.tva_type = obj.tva
			}
		} else if (obj.tva_type instanceof _TVAType) {
			this.tva_type = obj.tva_type
		} else if (typeof obj.tva_type === 'number') {
			this.tva_type = obj.tva_type
		} else {
			this.tva_type = new _TVAType(obj.tva_type)
		}

		if (!obj.user) {
			if (obj.vendor_id === undefined) {
				this.user = null
			} else {
				this.user = obj.vendor_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}

		if (!obj.productState) {
			if (obj.state === undefined) {
				this.productState = null
			} else {
				this.productState = obj.state
			}
		} else if (obj.productState instanceof _ProductState) {
			this.productState = obj.productState
		} else if (typeof obj.productState === 'number') {
			this.productState = obj.productState
		} else {
			this.productState = new _ProductState(obj.productState)
		}

		if (!obj.productVisibilty) {
			if (obj.visibility === undefined) {
				this.productVisibilty = null
			} else {
				this.productVisibilty = obj.visibility
			}
		} else if (obj.productVisibilty instanceof _ProductVisibilty) {
			this.productVisibilty = obj.productVisibilty
		} else if (typeof obj.productVisibilty === 'number') {
			this.productVisibilty = obj.productVisibilty
		} else {
			this.productVisibilty = new _ProductVisibilty(obj.productVisibilty)
		}

		if (!obj.sub_orders || obj.sub_orders.length === 0) {
			this.sub_orders = new RelationMany<_SubOrder>([])
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
			this.product_categories = new RelationMany<_ProductCategory>([])
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
			this.gallery = new RelationMany<_Media>([])
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
			unique_product: this.unique_product,
			linked_products: this.linked_products,
			product_image: this.product_image,
			product_keywords: this.product_keywords,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			has_tva: this.has_tva,
			visibility: this.visibility,
			media: this.media,
			tva_type: this.tva_type,
			user: this.user,
			productState: this.productState,
			productVisibilty: this.productVisibilty,
			sub_orders: this.sub_orders,
			product_categories: this.product_categories,
			gallery: this.gallery,
		}
	}

	static async all(
		query: Prisma.ProductFindFirstArgsBase,
	): Promise<_Product[]> {
		const models = await _Product.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Product(m))
			return acc
		}, [] as _Product[])
	}

	static async from<F extends Prisma.ProductWhereInput>(
		where: F,
		opt?: Omit<Prisma.ProductFindFirstArgsBase, 'where'>,
	): Promise<_Product | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _Product.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _Product.getIncludes()
		}

		const dbQuery = await _Product.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _Product(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Product.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Product.getIncludes(depth),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })!
			}
		}
	}

	async save(): Promise<boolean> {
		try {
			await this.prismaClient.$transaction(async (tx): Promise<number> => {
				const saveYield = this.saveToTransaction(tx)
				console.log("First YIELD")
				await saveYield.next()
				console.log("Second YIELD")
				return (await saveYield.next()).value
			})
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	async* saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0]
	) {
		console.log("OK")
		yield new Promise<number>(resolve => resolve(0))
		console.log("OK BIS")
		return new Promise<number>(resolve => resolve(1))
	}
}
