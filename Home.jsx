import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountRestaurant from './CountRestaurant';
import Restaurant from './Restaurant';
import Loader from './Loader';
import Message from './Message';
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../../actions/restaurantAction';

export default function Home() {
  const dispatch = useDispatch();
  const { loading: restaurantsLoading, error: restaurantsError, restaurants, showVegOnly } = useSelector(
    (state) => state.restaurants
  );

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleSortByReview = () => {
    dispatch(sortByReviews());
  };

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
      <CountRestaurant />
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger">{restaurantsError}</Message>
      ) : (
        <>
          <section>
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>
              <button className="sort_rev p-3" onClick={handleSortByReview}>
                Sort By Review
              </button>
              <button className="sort_rate p-3" onClick={handleSortByRatings}>
                Sort By Rating
              </button>
            </div>

            <div className="row mt-4">
              {restaurants.length ? (
                restaurants
                  .filter((restaurant) => !showVegOnly || (showVegOnly && restaurant.isVeg))
                  .map((restaurant) => (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ))
              ) : (
                <Message variant="info">No Restaurant Found</Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
