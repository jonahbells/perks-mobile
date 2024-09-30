import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons"; // for icons

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { signUp, getCurrentUser } from "../../hook/auth";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: ""
  });

  const validateForm = () => {
    let errors = {};
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!reg.test(form.email)) errors.email = "Email is incorrect";
    if (!form.email) errors.email = "Email is required";
    if (!form.password) errors.password = "Password is required";
    if (form.password != form.confirm_password) {
      errors.notMatch = "Password do not match"
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    // if (form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }
    if (validateForm()) {
      setSubmitting(true);

      try {
        await signUp(form.email, form.password);
        const result = await getCurrentUser();
        console.log(result);
        setUser(result);
        setIsLogged(true);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
      <View
        className="w-full flex items-center h-full px-4 mt-5"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
        <View>
          <Image
            source={images.perksIcon}
            resizeMode="contain"
            className="w-[300] h-[60]"
          />
        </View>

        <Text className="text-3xl font-semibold text-black mt-5">
          Register Account
        </Text>
        <Text className="text-base font-semibold text-gray-500 mt-2">
          Please enter your details to register.
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-5"
          keyboardType="email-address"
          placeholder="perks@customer.com"
          errors={errors.email}
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-5"
          placeholder="• • • • • • • •"
          errors={errors.password}
        />

        <FormField
          title="Confirm Password"
          value={form.confirm_password}
          handleChangeText={(e) => setForm({ ...form, confirm_password: e })}
          otherStyles="mt-5"
          placeholder="• • • • • • • •"
          errors={errors.notMatch}
        />

        <CustomButton
          title="Login"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={isSubmitting}
        />

        <View className="w-full items-center">
          {/* OR separator */}
          <View className="flex-row items-center my-5">
            {/* Left line */}
            <View className="flex-1 h-px bg-gray-300" />

            {/* OR text */}
            <Text className="mx-2 text-gray-500">OR</Text>

            {/* Right line */}
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Apple Button */}
          <TouchableOpacity className="w-full py-4 flex-row items-center justify-center bg-gray-300 border-gray-300 rounded-2xl">
            <FontAwesome name="apple" size={24} color="black" />
            <Text className="text-gray-700 text-lg font-semibold ml-2">
              Sign in with Apple
            </Text>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity className="w-full py-4 mt-2 flex-row items-center justify-center border bg-gray-300 border-gray-300 rounded-2xl">
            <FontAwesome name="google" size={24} color="gray" />
            <Text className="text-gray-700 text-lg font-semibold ml-2">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center flex-row gap-2 mt-2">
          <Text className="text-lg text-gray-500 font-pregular">
            Have an account already?
          </Text>
          <Link href="/sign-in" className="text-lg font-psemibold text-primary">
            Login
          </Link>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
