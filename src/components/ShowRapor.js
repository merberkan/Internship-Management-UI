import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/Rapor.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import AllPagesPDFViewer from "./all-pages";

import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

const Input = styled("input")({
  display: "none",
});

const rejectReasons = [
  "Şirket Bilgileri Yetersiz",
  "Rapor Formatı Yanlış",
  "Eksik Bilgi",
  "Kaynak Eksikliği",
];

const ShowRapor = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const { key } = useParams();

  console.log("decoded code:", decoded);
  const history = useHistory();
  // const dataGridColumns = userList.data.columns;
  const [isFileUploaded, setIsFileUploaded] = useState();
  const [ifControl, setIfControl] = useState(true);
  const [data, setData] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isUserStakeholder, setIsUserStakeholder] = useState(null);
  const [isUserStudent, setIsUserStudent] = useState(null);


  useEffect(() => {
    const abortCont = new AbortController(); // we use abort controller to stop the fetch

    fetch("http://localhost:3001/api/user/form/" + key, {
      signal: abortCont.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: null,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setData(data.list[0]);
        setPdf(data.pdf);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    //* cleans state for abort warnings while fetching for data
    return () => abortCont.abort();
  }, [ifControl]);

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Reddetme Sebebi</DialogTitle>
        <List sx={{ pt: 0 }}>
          {rejectReasons.map((reason) => (
            <ListItem
              button
              onClick={() => handleListItemClick(reason)}
              key={reason}
            >
              <ListItemText primary={reason} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const handleClickOpen = () => {
    console.log("opened");
    setOpen(true);
  };

  const handleClose = (value) => {
    console.log("closed");
    setSelectedValue(value);
    setOpen(false);
    if (value != "") {
      const model = {
        uniqueKey: key,
        status: "0",
        rejectReason: value,
      };
      fetch("http://localhost:3001/api/form-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(model),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.ok) {
            history.push("/studentforms");
          }
        })
        .catch((e) => {
          console.log("cannot logged:", e.message);
        });
      console.log("clicked reject");
    }
  };

  const handleApprove = () => {
    const model = {
      uniqueKey: key,
      status: "1",
    };
    console.log("approved fired")
    fetch("http://localhost:3001/api/form-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  if (data && ifControl) {
    console.log("deneme", data);
    setIfControl(false);
  }

  if (isUserStakeholder === null) {
    if (decoded.role === 6) {
      setIsUserStakeholder(true);
    } else {
      setIsUserStakeholder(false);
    }
  }

  if (isUserStudent === null) {
    if (decoded.role === 1) {
      setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
    }
  }

  return (
    <div className="rapor-container">
      <div className="rapor-container">
        <div className="Navbar-Part">
          <Navbar token={decoded}></Navbar>
        </div>
        {data && (
          <div className="rapor-content">
            {pdf && <AllPagesPDFViewer pdf={pdf}></AllPagesPDFViewer>}
            {!data.IsConfirmed && !isUserStudent && !data.IsRejected &&(
              <div className="show-rapor-buttons-part">
                <div className="show-rapor-reject">
                  <div className="rapor-dialog">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpen}
                    >
                      Reject
                    </Button>
                    {data && (
                      <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                      />
                    )}
                  </div>
                </div>
                <div className="show-rapor-approve">
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<ThumbUpIcon />}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            )}
            {data.IsConfirmed && (
              <div className="show-rapor-approved-info">
                <h2>Approved</h2>
              </div>
            )}
            {data.IsRejected && (
              <div className="show-rapor-rejected-info">
                <h2>Rejected</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowRapor;
