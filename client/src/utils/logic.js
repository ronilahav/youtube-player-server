import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import { addVideo } from "../api/crudRequests";
import { getVideoDetails } from "../api/youtube";

momentDurationFormatSetup(moment);

export const onAdd = (value) => {
  try {
    const url = new URL(value);
    const embedCode = url.searchParams.get("v");
    if (embedCode) {
      getVideoDetails(embedCode).then(({ title, length }) =>
        addVideo({ url: value, embedCode, title, length }).catch((error) =>
          console.error(error)
        )
      );
    }
  } catch (error) {}
};

export const processDuration = (duration) =>
  moment.duration(duration).format("h:mm:ss").padStart(4, "0:0");

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
