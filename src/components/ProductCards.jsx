import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import StarRating from 'react-native-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { addWishlist, deleteWishlist } from '../store/action'

export default function ProductCards({item}){
  let [fontsLoaded] = useFonts(
    {
      OpenSans_400Regular
    }
  )
  let discountPrice
  const wishlist=(useSelector(state => state.wishlist))
  const dispatch = useDispatch()
  const existInWishlist = wishlist.find(found => found.id === item.id)

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>
  }

  if (item.discount) {
    discountPrice = item.price-(item.discount/100*item.price)
  }

  function postWishlist() {
    if (existInWishlist) {
      let newList = wishlist.filter(data => {return data.id !== item.id})
      dispatch(deleteWishlist(newList))
    } else {
      dispatch(addWishlist(item))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <TouchableOpacity onPress={postWishlist} style={styles.wishlist}>
            {existInWishlist ? <FontAwesomeIcon icon={ fasFaHeart } color={ 'red' }/> : <FontAwesomeIcon icon={ farFaHeart } color={ 'red' }/>}
          </TouchableOpacity>
          <Image source={{uri: item.picture}} style={styles.image}/>
        </View>
        <View style={styles.cardtext}>
          <Text style={styles.title} numberOfLines={2}>{item.name_product}</Text>
          { item.cashback && <Text style={styles.cashback}>cashback</Text>}
          { !item.discount ? 
            <Text style={styles.price}>Rp{item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text> : 
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.discount}>{item.discount}%</Text>
              <Text style={styles.originprice}>Rp{item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
              <Text style={styles.price}>Rp{discountPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
            </View>
          }
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <View style={{marginTop: 3, marginBottom: 4}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                fullStarColor={"#f9d71c"}
                starSize={14}
              />
            </View>
            <Text style={styles.sold}>{`(${item.sold})`}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wishlist: {
    position: 'absolute', 
    top: 8, 
    right: 8, 
    zIndex: 1
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
    width: 188,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  image: {
    width: 188,
    height: 188,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative'
  },
  cardtext: {
    padding: 8,
    backgroundColor: '#fff',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    height: 125
  },
  title:{
    alignSelf: 'stretch',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 13,
    marginBottom: 4
  },
  cashback: {
    backgroundColor: 'rgb(214, 255, 222)', 
    color: 'rgb(3, 172, 14)',
    fontWeight: 'bold',
    fontFamily: 'OpenSans_400Regular',
    marginRight: 'auto',
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 3,
    fontSize: 11,
    paddingTop: 3,
    paddingLeft: 4,
    paddingBottom: 3
  },
  discount: {
    backgroundColor: 'rgb(255, 234, 239)', 
    color: 'rgb(255, 92, 132)',
    fontWeight: 'bold',
    fontFamily: 'OpenSans_400Regular',
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 3,
    fontSize: 11,
    paddingTop: 3,
    paddingLeft: 4,
    paddingBottom: 3
  },
  originprice: {
    color: 'rgba(49, 53, 59, 0.44)',
    textDecorationLine: 'line-through',
    fontSize: 11,
    paddingTop: 3,
    paddingLeft: 4,
    fontFamily: 'OpenSans_400Regular',
  },
  price: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sold: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    color: 'rgba(49, 53, 59, 0.44)',
    paddingLeft: 4
  }
});