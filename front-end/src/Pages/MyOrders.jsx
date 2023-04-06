import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import OrderCard from '../Components/OrderCard';
import { getUser } from '../Utils/LocalStorage';
import { getRequest } from '../Utils/axios';
import ContainerMyOrders from './CSS/ContainerMyOrders';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const { id, role } = getUser();
    const request = async () => {
      const response = await getRequest(`/${role}/${id}/sales`);
      setUserRole(role);
      return setOrders(response);
    };
    request();
  }, []);
  return (
    <ContainerMyOrders>
      <Navbar />
      <div id="orders-container">
        {
          orders.map((e) => (
            <OrderCard
              key={ e.id }
              id={ e.id }
              status={ e.status }
              saleDate={ e.saleDate }
              totalPrice={ e.totalPrice }
              role={ userRole }
              address={ e.deliveryAddress }
              numberHouse={ e.deliveryNumber }
            />
          ))
        }
      </div>
    </ContainerMyOrders>
  );
}
MyOrders.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default MyOrders;
