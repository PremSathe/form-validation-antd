// App.js
import "./App.css";
import { useState } from "react"; // Import useState
import {
  Form,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  Row,
  Col,
  Divider,
} from "antd";

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

  return (
    <div className="App">
      <header className="App-header">
        <Form
          autoComplete="off"
          layout="vertical"
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
                        : Promise.reject("Password does not match criteria."),
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
                name="aadhar"
              >
                <Input placeholder="Enter aadhar no. (1111 2222 3333)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dealer Location" name="locations">
                <Select
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
                      <Checkbox checked={selectedLocations.includes(item.name)}>
                        {item.name}
                      </Checkbox>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
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
