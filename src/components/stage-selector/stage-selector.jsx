import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
    defineMessages,
    intlShape,
    injectIntl,
    FormattedMessage,
} from "react-intl";
import ReactTooltip from "react-tooltip";

import Box from "../box/box.jsx";
import ActionMenu from "../action-menu/action-menu.jsx";
import ActionMenuUpload from "../action-menu/action-menu-upload.jsx";
import styles from "./stage-selector.css";
import stylesBtn from "../action-menu/action-menu.css";
import { isRtl } from "openblock-l10n";

import backdropIcon from "../action-menu/icon--backdrop.svg";
import fileUploadIcon from "../action-menu/icon--file-upload.svg";
import paintIcon from "../action-menu/icon--paint.svg";
import surpriseIcon from "../action-menu/icon--surprise.svg";
import searchIcon from "../action-menu/icon--search.svg";

const messages = defineMessages({
    addBackdropFromLibrary: {
        id: "gui.spriteSelector.addBackdropFromLibrary",
        description: "Button to add a stage in the target pane from library",
        defaultMessage: "Choose a Backdrop",
    },
    addBackdropFromPaint: {
        id: "gui.stageSelector.addBackdropFromPaint",
        description: "Button to add a stage in the target pane from paint",
        defaultMessage: "Paint",
    },
    addBackdropFromSurprise: {
        id: "gui.stageSelector.addBackdropFromSurprise",
        description: "Button to add a random stage in the target pane",
        defaultMessage: "Surprise",
    },
    addBackdropFromFile: {
        id: "gui.stageSelector.addBackdropFromFile",
        description: "Button to add a stage in the target pane from file",
        defaultMessage: "Upload Backdrop",
    },
});

const StageSelector = (props) => {
    const {
        backdropCount,
        containerRef,
        dragOver,
        fileInputRef,
        intl,
        selected,
        raised,
        receivedBlocks,
        url,
        onBackdropFileUploadClick,
        onBackdropFileUpload,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onNewBackdropClick,
        onSurpriseBackdropClick,
        onEmptyBackdropClick,
        ...componentProps
    } = props;
    const tooltipId = `tooltip-${Math.random()}`;
    return (
        <Box
            className={classNames(styles.stageSelector, {
                [styles.isSelected]: selected,
                [styles.raised]: raised || dragOver,
                [styles.receivedBlocks]: receivedBlocks,
            })}
            componentRef={containerRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...componentProps}
        >
            <div key={`${tooltipId}-up`}>
                <button
                    aria-label={intl.formatMessage(
                        messages.addBackdropFromFile
                    )}
                    className={classNames(
                        stylesBtn.button,
                        stylesBtn.mainButton,
                        {}
                    )}
                    data-for={tooltipId}
                    data-tip={intl.formatMessage(messages.addBackdropFromFile)}
                    onClick={onBackdropFileUploadClick}
                >
                    <img
                        className={stylesBtn.moreIcon}
                        draggable={false}
                        src={fileUploadIcon}
                    />

                    <input
                        accept={".svg, .png, .bmp, .jpg, .jpeg, .gif"}
                        className={stylesBtn.fileInput}
                        multiple={true}
                        ref={fileInputRef}
                        type="file"
                        onChange={onBackdropFileUpload}
                    />
                </button>
                <ReactTooltip
                    className={classNames(stylesBtn.tooltip, {})}
                    effect="solid"
                    id={tooltipId}
                    place={"left"}
                />
            </div>
            {url ? <img className={styles.costumeCanvas} src={url} /> : null}
            <div className={styles.label}>
                <FormattedMessage
                    defaultMessage="Backdrops"
                    description="Label for the backdrops in the stage selector"
                    id="gui.stageSelector.backdrops"
                />
            </div>

            <div className={styles.count}>{backdropCount}</div>
            <ActionMenu
                className={styles.addButton}
                img={backdropIcon}
                title={intl.formatMessage(messages.addBackdropFromLibrary)}
                tooltipPlace={isRtl(intl.locale) ? "right" : "left"}
                onClick={onNewBackdropClick}
            />
        </Box>
    );
};

StageSelector.propTypes = {
    backdropCount: PropTypes.number.isRequired,
    containerRef: PropTypes.func,
    dragOver: PropTypes.bool,
    fileInputRef: PropTypes.func,
    intl: intlShape.isRequired,
    onBackdropFileUpload: PropTypes.func,
    onBackdropFileUploadClick: PropTypes.func,
    onClick: PropTypes.func,
    onEmptyBackdropClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onNewBackdropClick: PropTypes.func,
    onSurpriseBackdropClick: PropTypes.func,
    raised: PropTypes.bool.isRequired,
    receivedBlocks: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    url: PropTypes.string,
};

export default injectIntl(StageSelector);
