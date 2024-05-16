import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { scaleWidth, scaleHeight } from '../Constants/dynamicSize';

const CustomMenu = (props) => {
    return (
        <MenuProvider style={styles.container}>
            <Menu>
                <MenuTrigger
                >
                    {props?.image}
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            backgroundColor: 'white',
                            borderBottomLeftRadius: 9,
                            borderBottomRightRadius: 9,
                            borderTopLeftRadius: 9,
                            width: scaleWidth(120),
                            marginTop: scaleHeight(15),
                        },
                    }}
                >
                    <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                    <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};

export default CustomMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});