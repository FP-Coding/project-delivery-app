import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatValues, { formatDate } from '../Utils/normalize';
import StyledOrderCard from './CSS/StyledOrderCard';

function OrderCard({ id, status, saleDate, totalPrice, role, address, numberHouse }) {
  return (
    <StyledOrderCard>
      <Link to={ `/${role}/orders/${id}` }>
        <div>
          <span
            data-testid={ `${role}_orders__element-order-id-${id}` }
          >
            {id}
          </span>
        </div>
        <div>
          <span
            data-testid={ `${role}_orders__element-delivery-status-${id}` }
          >
            {status}
          </span>
        </div>
        <div id="data-and-total">
          <p
            data-testid={ `${role}_orders__element-order-date-${id}` }
          >
            {formatDate(saleDate)}
          </p>
          <p
            data-testid={ `${role}_orders__element-card-price-${id}` }
          >
            {formatValues(totalPrice)}
          </p>
        </div>
        { role === 'seller' && (
          <div>
            <p
              data-testid={ `seller_orders__element-card-address-${id}` }
            >
              { `${address}, ${numberHouse}`}
            </p>
          </div>
        )}
      </Link>
    </StyledOrderCard>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.Date,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  role: PropTypes.string,
}.isRequired;

export default OrderCard;
