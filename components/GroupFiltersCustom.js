//In components/GroupFiltersCustom.js...

import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Button, Text, Switch } from "react-native";
import { useDispatch } from "react-redux";
import { groupsRequested } from "@src/actions/socialGroups";
import { getExternalCodeSetup } from "@src/externalCode/externalRepo";
import withGlobalStyles from "@src/components/hocs/withGlobalStyles";
import { Dropdown } from "react-native-element-dropdown";
import Input from "../Input";

const hook = getExternalCodeSetup().groupsListHooksApi;

getExternalCodeSetup().indexScreenApiHooks.setHeaderHeight(
  (defaultHeaderHeight, filterType, navigation) => {
    if (filterType === "groups") return 300;

    return defaultHeaderHeight;
  }
);

const screenName = "HomeGroupsScreen";

const filter = "all"; //"all", "personal", "my-groups", "invites"
const subfilters = { type: "active" }; // "active", "newest", "alphabetical", "popular";

const refresh = true; //Set to true to refresh list
const searchTerm = "";

const GroupFiltersCustom = (props) => {
  const [locationFilter, setLocationFilter] = useState(null);
  const { navigation, colors } = props;

  const dispatch = useDispatch();

  //If showing the matched screen, show custom filter before displaying list component
  if (navigation?.state?.routeName === screenName) {
    const handleSubmit = () => {
      //Set custom parameters before fetching
      hook.setFetchParamsFilter((props) => {
        //You can add more parameters such as "subject", "keyword" etc...
        const customProps = { ...props, locationFilter };
        console.log(customProps);
        return customProps;
      });

      //Dispatch redux action to call api using customized filters
      dispatch(groupsRequested(filter, subfilters, refresh, searchTerm));
    };

    return (
      <View
        style={{
          display: "flex",
          backgroundColor: colors.whiteColor,
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "center",
          padding: 10,
          borderColor: colors.grey,
          borderWidth: 0.2,
        }}
      >
        <Input
          type="select"
          data={[
            { label: "Todos", value: null },
            { label: "País", value: "country" },
            { label: "Municipio", value: "municipality" },
            { label: "Localidad", value: "suburb" },
          ]}
          containerStyle={{ flex: 1, paddingRight: 4 }}
          value={locationFilter}
          placeholder={"Seleccione un filtro"}
          label={"Filtrar por ubicación"}
          onChange={setLocationFilter}
        />

        <TouchableOpacity
          style={{
            borderRadius: 12,
            backgroundColor: "rgb(0,105,255)",
          }}
          onPress={() => handleSubmit()}
        >
          <Text
            style={{
              color: colors.whiteColor,
              fontWeight: "600",
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
          >
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

export default withGlobalStyles(GroupFiltersCustom);
