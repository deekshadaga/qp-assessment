import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    grocery_item_id: number

    @Column()
    grocery_id: number

    @Column()
    quantity: number

    @ManyToOne(() => Order, (order) => order.groceryList, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    order_id: Order;
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    order_id: number

    @Column()
    userName: string

    @OneToMany(() => Item,  grocery => grocery.order_id,{
        cascade:true,
        eager: true
    })
    groceryList: Item[];

}
