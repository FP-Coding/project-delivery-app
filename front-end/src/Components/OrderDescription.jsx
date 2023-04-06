import React from 'react';
import PropTypes from 'prop-types';
import { removeProductCart } from '../Utils/LocalStorage';
import formatValues from '../Utils/normalize';
import StyledTableOrder from './CSS/StyledTableOrder';
import Button from './Button';

function OrderDescription({ history, orders, totalPrice, updateCart }) {
  const { location: { pathname } } = history;
  const role = pathname.split('/')[1];
  const path = pathname.includes('checkout') ? 'checkout' : 'order_details';

  return (
    <StyledTableOrder>
      <h2>
        Finalizar Pedido
      </h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {path === 'checkout'
            && <th id="excluir">Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ name, quantity, price, id, productName }, i) => (
            <tr key={ i }>
              <td
                data-testid={ `${role}_${path}__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `${role}_${path}__element-order-table-name-${i}` }
              >
                { productName || name }
              </td>
              <td
                data-testid={ `${role}_${path}__element-order-table-quantity-${i}` }
              >
                {quantity}
              </td>
              <td>
                R$
                <span
                  data-testid={ `${role}_${path}__element-order-table-unit-price-${i}` }
                >
                  {formatValues(price)}
                </span>
              </td>
              <td>
                R$
                <span
                  data-testid={ `${role}_${path}__element-order-table-sub-total-${i}` }
                >
                  {formatValues(Number(price) * Number(quantity))}
                </span>
              </td>
              {
                path === 'checkout' && (
                  <td
                    data-testid={ `${role}_checkout__element-order-table-remove-${i}` }
                  >
                    <Button
                      textColor="white"
                      backgroundColor="darkred"
                      border="none"
                      text="Remover"
                      type="button"
                      onClick={ () => {
                        removeProductCart({ id });
                        return updateCart();
                      } }
                    />
                  </td>)
              }
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Total: R$
        <span data-testid={ `${role}_${path}__element-order-total-price` }>
          {totalPrice}
        </span>
      </div>
    </StyledTableOrder>
  );
}

OrderDescription.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  orders: PropTypes.array,
  totalPrice: PropTypes.string,
  updateCart: PropTypes.func,
}.isRequired;

export default OrderDescription;
