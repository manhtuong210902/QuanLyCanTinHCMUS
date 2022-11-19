import classNames from 'classnames/bind';
import { prodErrorMap } from 'firebase/auth';
import styles from './bill.module.scss';
const cx = classNames.bind(styles);

const Bill = (props) => {
    console.log(props.bill);
    return (
        <div className={cx('modal-page')}>
            <div className={cx('bill')}>
                <h2 style={{ marginTop: '3px', textAlign: 'center' }}>Hóa đơn</h2>
                <div className={cx('info-table')}>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row">Khách hàn:g</th>
                                <td>{props.bill.userName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Ngày mua:</th>
                                <td>{props.bill.orderDate}</td>
                            </tr>
                            <tr>
                                <th scope="row">Bàn đã đặt:</th>
                                <td>{props.bill.table}</td>
                            </tr>
                            <tr>
                                <th scope="row">Khung giờ:</th>
                                <td>
                                    {props.bill.time} đến {props.bill.timeEnd}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    Danh sách sản phẩm
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Đơn gía</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.bill.orders.map((order)=>{
                                return (
                                <tr>
                                <th scope="row">{Number(order.index)+1}</th>
                                <td>{order.name}</td>
                                <td>{order.amount}</td>
                                <td>{order.price}</td>
                            </tr>    )
                            })}
                            <tr>
                                <th scope="row">Tổng</th>
                                <td></td>
                                <td></td>
                                <td>{props.bill.total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={cx('list-btn')}>
                        <button className={cx('btn')} onClick={()=>{
                            props.change(false)
                            props.changeModal(false)
                        }}>back</button>
                        <button className={cx('btn')} onClick={()=>{
                            props.change(false)
                            props.changeModal(false)
                            props.changeList([])
                        }}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Bill;
