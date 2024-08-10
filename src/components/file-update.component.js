import React, { useState, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloudUpload from "@material-ui/icons/CloudUpload";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import authHeader from "../services/auth-header";
import { clsx } from "clsx";

const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    height: 300,
    background: "#efefef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "#aaa",
  },
  preview: {
    width: 200,
    height: 200,
    margin: "auto",
    display: "block",
    marginBottom: theme.spacing(2),
    objectFit: "contain",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function FileUpdate() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("https://via.placeholder.com/250");
  const [percent, setPercent] = useState(0);
  const [downloadUri, setDownloadUri] = useState("");

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
    const previewUrl = URL.createObjectURL(acceptedFiles[0]);
    setPreview(previewUrl);
    setSuccess(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const { ref, ...rootProps } = getRootProps();

  const updateFile = async () => {
    try {
      setSuccess(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      let fileId = JSON.parse(localStorage.getItem("file"));
      let userId = JSON.parse(localStorage.getItem("user")).id;
      const API_URL = `http://localhost:3000/api/file/updateFile/${fileId}/${userId}`;
      const response = await axios
        .post(API_URL, formData, {
          headers: authHeader(),
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setPercent(percentCompleted);
          },
        })
        .then((response) => {
          setSuccess(true);
          setDownloadUri(response.data.url);
          setLoading(false);
          window.location.href = "/fileInGroup";
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the file.");
    }
  };

  const handleDownloadLinkClick = () => {
    console.log("hi");
  };

  return (
    <div>
      <Paper elevation={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography align="center" style={{ padding: 16 }}>
              File Update
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6} style={{ padding: 16 }}>
            <RootRef rootRef={ref}>
              <Paper
                {...rootProps}
                elevation={0}
                className={classes.dropzoneContainer}
              >
                <input {...getInputProps()} />
                <p>update File</p>
              </Paper>
            </RootRef>
          </Grid>
          <Grid item xs={6} style={{ padding: 16 }}>
            <Typography align="center" variant="subtitle1">
              Preview
            </Typography>
            <img
              onLoad={() => URL.revokeObjectURL(preview)}
              className={classes.preview}
              src={preview}
              alt="text file"
            />
            {file && (
              <>
                <Divider />
                <Grid container style={{ marginTop: 16 }} alignItems="center">
                  <Grid item xs={2}>
                    <div className={classes.wrapper}>
                      <Fab
                        aria-label="save"
                        color="default"
                        className={buttonClassname}
                        onClick={updateFile}
                      >
                        {success ? <CheckIcon /> : <CloudUpload />}
                      </Fab>
                      {loading && (
                        <CircularProgress
                          size={68}
                          className={classes.fabProgress}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    {file && (
                      <Typography variant="body1">{file.name}</Typography>
                    )}
                    {loading && (
                      <div>
                        <LinearProgress variant="determinate" value={100} />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="body1">100</Typography>
                        </div>
                      </div>
                    )}
                    {success && (
                      <Typography>
                        File updated Success!
                        <a
                          href={downloadUri}
                          onClick={handleDownloadLinkClick}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Link
                        </a>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default FileUpdate;
