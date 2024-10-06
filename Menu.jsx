import React, { useEffect } from 'react';
import FoodItem from './FoodItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../../actions/menuAction';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

export default function Menu() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { menus, loading, error } = useSelector((state) => state.menus);

  useEffect(() => {
    dispatch(getMenus(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (!menus || menus.length === 0) {
    return <Message variant="info">No Menus Found</Message>;
  }

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu._id}>
          <h2>{menu.category}</h2>
          <hr />
          {menu.items && menu.items.length > 0 ? (
            <div className='row'>
              {menu.items.map((foodItem) => (
                <FoodItem key={foodItem._id} foodItem={foodItem} restaurant={id} />
              ))}
            </div>
          ) : (
            <Message variant="info">No FoodItem Found</Message>
          )}
        </div>
      ))}
    </div>
  );
}
