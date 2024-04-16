import "./App.css";
import { useState } from "react"; // Import useState
import {
  Form,
  Button,
  DatePicker,
  Checkbox,
  Input,
  Select,
  Row,
  Col,
  Divider,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

function App() {
  // Gender list items
  const genderItems = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];
  const operations = [
    { name: "Sales" },
    { name: "Service" },
    { name: "Common" },
  ];
  const locations = [
    { name: "Borivali" },
    { name: "Kandivali" },
    { name: "Chowpaty" },
  ];
  // State to manage selected locations
  const [selectedLocations, setSelectedLocations] = useState([]);
  // Form reference to reset fields
  const [form] = Form.useForm();

  // Function to handle form reset
  const handleCancel = () => {
    form.resetFields();
    setSelectedLocations([]); // Reset selected locations
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Form
              autoComplete="off"
              layout="vertical"
              form={form} // Set form instance
              onFinish={(values) => {
                // Perform form validation here
                if (values.email && values.password && values.confirmPassword) {
                  console.log({ values });
                } else {
                  console.log("Please fill in all required fields.");
                }
              }}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
              initialValues={{}}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item
                    label={<CustomLabel label="Email" />}
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type your email" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={<CustomLabel label="Password" />}
                    name="password"
                    rules={[
                      { required: true },
                      { min: 6 },
                      {
                        validator: (_, value) =>
                          value && value.includes("A")
                            ? Promise.resolve()
                            : Promise.reject(
                                "Password does not match criteria."
                              ),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Type your password" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={<CustomLabel label="Confirm Password" />}
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Passwords do not match.");
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Confirm your password" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Gender" name="gender">
                    <Select
                      className="custom-dropdown"
                      placeholder="Select gender"
                      style={{ textAlign: "left" }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {genderItems.map((item, index) => (
                        <Select.Option key={index} value={item.name}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label={<CustomLabel label="Dealer Operations" />}
                    name="Operations"
                  >
                    <Select
                      className="custom-dropdown"
                      placeholder="Select Dealer operation"
                      style={{ textAlign: "left" }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {operations.map((item, index) => (
                        <Select.Option key={index} value={item.name}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={<CustomLabel label="Date of Birth" />}
                    name="dob"
                    rules={[
                      {
                        required: false,
                        message: "Please provide your date of birth",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      picker="date"
                      placeholder="Choose date of birth"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={<CustomLabel label="Website" />}
                name="website"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
                hasFeedback
              >
                <Input placeholder="Add your website URL" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label={<CustomLabel label="Aadhaar Card No." />}
                    name="Aadhar-card"
                  >
                    <Input placeholder="Enter aadhar no. (1111 2222 3333)" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Dealer Location" name="locations">
                    <Select
                      className="custom-dropdown"
                      placeholder="Select dealer location"
                      style={{ textAlign: "left" }}
                      mode="multiple"
                      dropdownRender={(menu) => (
                        <div>
                          <Divider style={{ margin: "4px 0" }} />
                          {menu}
                        </div>
                      )}
                      value={selectedLocations} // Use selectedLocations as value
                      onChange={(values) => setSelectedLocations(values)} // Update selectedLocations state
                    >
                      {locations.map((item, index) => (
                        <Select.Option key={index} value={item.name}>
                          <Checkbox
                            checked={selectedLocations.includes(item.name)}
                          >
                            {item.name}
                          </Checkbox>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="center">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Dragger {...uploadProps}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="58"
                      viewBox="0 0 70 58"
                      fill="none"
                    >
                      <path
                        d="M68.3334 29H48.3334L41.6667 39H28.3334L21.6667 29H1.66675"
                        stroke="#B5B5B6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.1667 6.03594L1.66675 29.0026V49.0026C1.66675 50.7707 2.36913 52.4664 3.61937 53.7166C4.86961 54.9669 6.5653 55.6693 8.33342 55.6693H61.6668C63.4349 55.6693 65.1306 54.9669 66.3808 53.7166C67.631 52.4664 68.3334 50.7707 68.3334 49.0026V29.0026L56.8334 6.03594C56.2815 4.92523 55.4307 3.99051 54.3766 3.33687C53.3225 2.68323 52.107 2.3366 50.8668 2.33594H19.1334C17.8931 2.3366 16.6776 2.68323 15.6236 3.33687C14.5695 3.99051 13.7187 4.92523 13.1667 6.03594V6.03594Z"
                        stroke="#B5B5B6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Col>
              </Row>

              <Form.Item>
                <Row
                  gutter={[16, 16]}
                  align="middle"
                  justify="center"
                  style={{ marginTop: "40px" }}
                >
                  <Col span={12}>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                    <Button
                      type="default"
                      onClick={handleCancel}
                      style={{ marginLeft: "8px" }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </header>
    </div>
  );
}

// CustomLabel component to wrap label text and asterisk
const CustomLabel = ({ label }) => (
  <span>
    {label}
    <span style={{ color: "red", marginLeft: "3px", fontSize: "medium" }}>
      *
    </span>
  </span>
);

export default App;
