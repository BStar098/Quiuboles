import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function Input({
  type,
  data,
  onChange,
  placeholder ,
  value,
  label  ,
  containerStyle,
}) {
  const [isFocus, setIsFocus] = useState(false);

  const renderElement = () => {
    switch (type) {
      case "select":
        return (
          <Dropdown
            data={data}
            style={styles.dropdownStyle}
            selectedTextStyle={styles.dropdownSelectedTextStyle}
            containerStyle={styles.dropdownContainerStyle}
            placeholderStyle={styles.dropdownPlaceholderStyle}
            itemContainerStyle={styles.dropdownItemContainerStyle}
            itemTextStyle={styles.dropdownItemTextStyle}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              onChange(item.value);
              setIsFocus(false);
            }}
          />
        );
    }
  };
  return (
    <View style={containerStyle}>
      <Text
        style={{
          color: "black",
          paddingBottom: 4,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      {renderElement()}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 12,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  dropdownSelectedTextStyle: {
    color: "black",
    fontSize: 13,
  },
  dropdownContainerStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 12,
  },
  dropdownPlaceholderStyle: {
    color: "grey",
    fontSize: 13,
  },
  dropdownItemContainerStyle: { borderRadius: 12 },
  dropdownItemTextStyle: {
    color: "black",
    fontSize: 13,
    borderRadius: 12,
  },
});
export default Input;
