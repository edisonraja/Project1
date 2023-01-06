import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Add";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  message: string;
}
interface State {
  segmentName: string;
  open: number;
  errorName: number;
  errorSchema: number;
  errorValue: number;
  totalSegments: any;
  currentSelect: string;
  schemaAdd: number;
  valuesSelected: any;
  rowsData: any;
}

let schemas = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];

let schemasObject: object = {
  first_name: "First Name",
  last_name: "Last Name",
  gender: "Gender",
  age: "Age",
  account_name: "Account Name",
  city: "City",
  state: "State"
};

class App extends React.Component<Props, State> {
  static defaultProps = { message: "hello" };
  static displayName = "yangq";
  static propTypes = {
    message: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      segmentName: "",
      open: 0,
      errorName: 0,
      errorSchema: 0,
      errorValue: 0,
      totalSegments: [],
      currentSelect: "",
      schemaAdd: 1,
      valuesSelected: [],
      rowsData: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSchema = this.addSchema.bind(this);
  }

  handleChange = (event: SelectChangeEvent) => {
    this.setState({
      currentSelect: event.target.value as string,
      errorSchema: 0,
      errorValue: 0
    });
  };

  handleClick() {
    console.log("test 7");
  }

  addSchema() {
    console.log(this.state.currentSelect);
    if (this.state.currentSelect === "") {
      this.setState({ errorSchema: 1 });
    } else {
      console.log("selectedValues", this.state.valuesSelected);
      let selectedValues = this.state.valuesSelected;
      selectedValues.push(this.state.currentSelect);
      console.log("selectedValues", selectedValues);
      this.setState({
        schemaAdd: 1,
        currentSelect: "",
        valuesSelected: selectedValues
      });
    }
    console.log("tes1", this.state.valuesSelected);
    this.state.valuesSelected.map((valueSelected) =>
      console.log("1", valueSelected)
    );
  }

  handleOpen() {
    this.setState({ open: 1 });
  }

  handleClose = () => {
    console.log("firstname", this.state.segmentName);
    this.setState({
      segmentName: "",
      open: 0,
      currentSelect: "",
      schemaAdd: 1,
      valuesSelected: []
    });
  };

  handleSave = () => {
    if (this.state.currentSelect !== "") {
      let selectedValues = this.state.valuesSelected;
      selectedValues.push(this.state.currentSelect);
      console.log("selectedValues", selectedValues);
      this.setState({
        valuesSelected: selectedValues,
        currentSelect: ""
      });
    }
    if (this.state.segmentName === "") {
      this.setState({ errorName: 1 });
    } else if (this.state.valuesSelected.length === 0) {
      this.setState({ errorValue: 1 });
    } else {
      this.setState({ open: 0 });
      let selectedValues = this.state.rowsData;
      selectedValues.push({
        id: uuidv4(),
        name: this.state.segmentName,
        count: this.state.valuesSelected.length
      });
      this.setState({
        segmentName: "",
        open: 0,
        currentSelect: "",
        schemaAdd: 1,
        valuesSelected: [],
        rowsData: selectedValues
      });
    }
  };

  handleCheck(val) {
    return this.state.valuesSelected.some((item) => val === item);
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Hello CodeSandbox 1</h1>
          <h2>Start editing to see some magic happen!</h2>
          <div align="right">
            <Button variant="contained" onClick={this.handleOpen}>
              Segment
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Schema Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rowsData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Saving Segment</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter the Name of the segment"
                type="string"
                variant="standard"
                fullWidth
                required={true}
                onChange={(e) =>
                  this.setState({ segmentName: e.target.value, errorName: 0 })
                }
              />
              {this.state.errorName === 1 && (
                <Alert severity="error" sx={{ width: "50%" }}>
                  Enter the Name of the segment
                </Alert>
              )}
              <div className="default-row-spacer">
                To save your segment, you need to add the schemas to build the
                query
              </div>
              {this.state.valuesSelected.map((valueSelected) => (
                <div className="default-list-spacer">
                  <Alert variant="outlined" severity="info">
                    {schemasObject[valueSelected]}
                  </Alert>
                </div>
              ))}
              {this.state.schemaAdd === 1 && (
                <div className="default-row-spacer">
                  <FormControl fullWidth>
                    <InputLabel id="add-schema-select-label">
                      Add schema to segment
                    </InputLabel>
                    <Select
                      labelId="add-schema-select"
                      id="demo-simple-select"
                      value={this.state.currentSelect}
                      label="Add schema to segment"
                      onChange={this.handleChange}
                    >
                      {schemas.map(
                        (schema) =>
                          this.handleCheck(schema.value) === false && (
                            <MenuItem value={schema.value}>
                              {schema.label}
                            </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </div>
              )}
              <div className="default-row-spacer">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={this.addSchema}
                >
                  Add new schema
                </Button>
                {this.state.errorSchema === 1 && (
                  <Alert severity="error" sx={{ width: "30%" }}>
                    Select value in add schema
                  </Alert>
                )}
                {this.state.errorValue === 1 && (
                  <Alert severity="error" sx={{ width: "30%" }}>
                    Select atleast one schema
                  </Alert>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleSave}>Save the Segment</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
