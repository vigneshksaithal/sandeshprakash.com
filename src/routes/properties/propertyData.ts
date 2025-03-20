export interface Property {
	id: number
	title: string
	location: string
	area: string
	type: string
	price: string
	image: string
}

export const properties: Property[] = [
	{
		id: 1,
		title: 'Modern Warehouse Space',
		location: 'Electronic City, Bengaluru',
		area: '20,000 sq ft',
		type: 'Warehouse',
		price: '₹80/sq ft/month',
		image:
			'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
	},
	{
		id: 2,
		title: 'Premium Office Space',
		location: 'Whitefield, Bengaluru',
		area: '5,000 sq ft',
		type: 'Office',
		price: '₹120/sq ft/month',
		image:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80'
	},
	{
		id: 3,
		title: 'Industrial Manufacturing Unit',
		location: 'Peenya Industrial Area, Bengaluru',
		area: '30,000 sq ft',
		type: 'Manufacturing',
		price: '₹60/sq ft/month',
		image:
			'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
	},
	{
		id: 4,
		title: 'Commercial Land Plot',
		location: 'Devanahalli, Bengaluru',
		area: '2 acres',
		type: 'Land',
		price: '₹2.5 Cr/acre',
		image:
			'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
	}
]
