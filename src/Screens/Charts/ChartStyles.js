import {StyleSheet} from 'react-native'
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/dynamicSize';
import { FONTS } from '../../Constants/fonts';
import { COLORS } from '../../Constants/colors'; 

export const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
      },
      chartheader: {
        textAlign: 'left',
        color: 'grey',
        fontWeight: '500',
        marginTop: scaleHeight(25),
        fontFamily: FONTS.NUNITOSANSBOLD
      },
      titlebox:{
        backgroundColor: COLORS.HEADERBG, 
        width: '100%' ,
        height: scaleHeight(48),
        alignItems:'center',
        justifyContent:'center'
      },
      charttitle: {
        textAlign: 'left',
        width: '100%',
        fontSize: normalizeFont(18),
        fontWeight: '600',
        color: COLORS.TITLE,
        marginLeft: scaleWidth(30),
        fontFamily: FONTS.NUNITOSANSMEDIUM
      },
      divider: {
        height: scaleHeight(3),
        backgroundColor: COLORS.HEADERBG,
        marginTop: scaleHeight(10)
      },
      box: {
        backgroundColor: '#fff',
        width: '93%',
        alignItems: 'center',
        justifyContent: 'center',
      },
})