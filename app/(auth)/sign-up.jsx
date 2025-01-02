import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [regSuccessMessage, setRegSuccessMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let errors = {};

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Check if there are any errors
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    if (validateForm()) {
      setSubmitting(true);

      try {
        console.log(form);
        const result = await signUp(form);

        if (result !== "Error") {
          setRegSuccessMessage(
            "You have successfully registered, we have sent an activation link to your email, please check."
          );
          setModalVisible(true);
        }
      } catch (error) {
        console.log("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView>
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

          <Text className="text-3xl font-psemibold text-black mt-5">
            Register Account
          </Text>
          <Text className="text-base font-pregular text-gray-500 mt-2">
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
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-5"
            placeholder="• • • • • • • •"
            errors={errors.confirmPassword}
          />

          <CustomButton
            title="Register"
            handlePress={submit}
            containerStyles="mt-5"
            isLoading={isSubmitting}
          />

          <View className="w-full items-center">
            {/* OR separator */}
            <View className="flex-row items-center my-4">
              {/* Left line */}
              <View className="flex-1 h-px bg-gray-300" />

              {/* OR text */}
              <Text className="mx-2 text-gray-500">OR</Text>

              {/* Right line */}
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Apple Button */}
            <TouchableOpacity className="w-full h-14 flex-row items-center justify-center border-[2px] border-gray-300 rounded-xl">
              <FontAwesome name="apple" size={24} color="black" />
              <Text className="text-gray-700 text-lg font-semibold ml-2">
                Sign in with Apple
              </Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity className="w-full h-14 mt-2 flex-row items-center justify-center border-[2px] border-gray-300 rounded-xl">
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
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-primary"
            >
              Login
            </Link>
          </View>
        </View>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white rounded-lg p-6 w-4/5 items-center">
                <Text className="text-lg font-psemibold text-center mb-6">
                  {regSuccessMessage}
                </Text>
                <TouchableOpacity
                  className="bg-red-500 py-2 px-4 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-base text-center">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
