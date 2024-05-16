import { Table, Row, Cell, TableWrapper } from 'react-native-table-component';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../Constants/colors';
import { FONTS } from '../Constants/fonts';
import { Icon } from 'react-native-elements';
import { scaleHeight, scaleWidth,normalizeFont } from '../Constants/dynamicSize';

const Tables = (props) => {

  const element = (data, index) => (
    <TouchableOpacity >
      <View style={styles.btn}>
        <Text style={[styles.btnText, { marginVertical: scaleHeight(10) }]}>{data}</Text>
        <Icon name={data < 100 || data > 160 ? 'caretdown' : 'caretup'} type={'antdesign'} size={scaleWidth(15)} color={data < 100 || data > 160 ? COLORS.RED : COLORS.GREEN} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Table >
      <Row data={props?.tableHead} style={styles.head} textStyle={styles.text} />
      {props?.tableData.map((rowData, index) => (
        <View key={`row-${index}`} style={styles.rowContainer}>
          <TableWrapper key={`wrapper-${index}`} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 0 ? cellData : element(cellData, index)}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        </View>
      ))}
    </Table>
  )
}

export default Tables;
const styles = StyleSheet.create({
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY
  },
  head: {
    backgroundColor: COLORS.TABLEHEADER,
    color: COLORS.WHITE,
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  btnText: {
    marginVertical: scaleHeight(6),
    color: COLORS.GOLDEN,
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    fontWeight: '600',
    fontSize: scaleHeight(14),
    textAlign: 'center',
    width: scaleWidth(60)
  },
  text: {
    marginVertical: scaleHeight(10),
    fontSize: normalizeFont(16),
    fontWeight: '600',
    color: COLORS.BLACK,
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    textAlign: 'center'
  },
})