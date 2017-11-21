function click_handler(data) {
    var status = data.status; // Can be "begin", "complete" or "success".
    var source = data.source; // The parent HTML DOM element.

    switch (status) {
        case "begin": // Before the ajax request is sent.
            // ...
            break;

        case "complete": // After the ajax response is arrived.
            // ...
            break;

        case "success": // After update of HTML DOM based on ajax response.
            // ...
            break;
    }
}