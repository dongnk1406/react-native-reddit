import Images from 'assets/images';
import Metrics from 'assets/metrics';
import {FontSizes} from 'assets/sizes';
import {Themes} from 'assets/themes';
import {StyledIcon, StyledText, StyledTouchable} from 'components/base';
import {MY_ARTWORK_ROUTE} from 'navigation/config/routes';
import {navigate} from 'navigation/service';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {EApprovalType} from 'utils/enum';

interface Props {
  onPublish?: (id: string | number) => void;
  onRemove?: (id: string | number) => void;
}

const ModalArtSetting = (props: Props, ref: any) => {
  const {onRemove, onPublish} = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [artworkId, setArtworkId] = useState<string | number>(0);
  const [artWorkStatus, setArtWorkStatus] = useState<string | number>(0);

  const isPublished =
    artWorkStatus === EApprovalType.WAITING_APPROVE ||
    artWorkStatus === EApprovalType.PUBLIC;

  useImperativeHandle(ref, () => ({
    show: ({id, status}: {id: string; status: number}) => {
      setIsVisible(true);
      setArtworkId(id);
      setArtWorkStatus(status);
    },
    hide: () => {
      setIsVisible(false);
    },
  }));

  const onBackdropPress = () => {
    setIsVisible(!isVisible);
  };

  const goEditArt = () => {
    setIsVisible(!isVisible);
    navigate(MY_ARTWORK_ROUTE.CREATE_ARTWORK, {
      idArtwork: artworkId,
    });
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      coverScreen={true}
      backdropColor={Themes.COLORS.black}
      backdropOpacity={0.4}
      onBackdropPress={onBackdropPress}>
      <View style={styles.childStyle}>
        <StyledText
          i18nText="myArt.artSettings"
          customStyle={styles.textTitle}
        />
        <StyledTouchable
          customStyle={[styles.wrapBtnSheet]}
          onPress={goEditArt}
          disabled={isPublished}>
          <StyledIcon
            source={Images.icons.editArt}
            size={24}
            customStyle={[isPublished && styles.iconDisable]}
          />
          <StyledText
            i18nText="myArt.editArtwork"
            customStyle={[styles.textAction, isPublished && styles.textDisable]}
          />
        </StyledTouchable>
        <StyledTouchable
          customStyle={styles.wrapBtnSheet}
          onPress={() => {
            setIsVisible(!isVisible);
            onPublish?.(artworkId);
          }}
          disabled={isPublished}>
          <StyledIcon
            source={Images.icons.tickSquare}
            size={24}
            customStyle={[isPublished && styles.iconDisable]}
          />
          <StyledText
            i18nText="myArt.publishedArtWork"
            customStyle={[styles.textAction, isPublished && styles.textDisable]}
          />
        </StyledTouchable>
        <StyledTouchable
          customStyle={styles.wrapBtnSheet}
          onPress={() => {
            setIsVisible(!isVisible);
            onRemove?.(artworkId);
          }}>
          <StyledIcon source={Images.icons.redDelete} size={24} />
          <StyledText
            i18nText="myArt.deleteArtwork"
            customStyle={styles.textAction}
          />
        </StyledTouchable>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  childStyle: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Themes.COLORS.white,
    width: Metrics.screenWidth,
    paddingBottom: Metrics.bottomPadding,
  },
  wrapBtnSheet: {
    flexDirection: 'row',
    height: '48@s',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Themes.COLORS.border,
    paddingHorizontal: '16@s',
  },
  wrapBtnSheetDisable: {
    opacity: 0.5,
  },
  textAction: {
    fontSize: FontSizes.FONT_14,
    fontFamily: Themes.FONTS.font500,
    color: Themes.COLORS.grey1,
    marginLeft: '8@s',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: FontSizes.FONT_16,
    fontFamily: Themes.FONTS.font600,
    marginVertical: '12@s',
    color: Themes.COLORS.grey1,
  },
  textContent: {
    textAlign: 'center',
    marginTop: '16@s',
    fontSize: FontSizes.FONT_14,
    lineHeight: FontSizes.FONT_20,
    fontFamily: Themes.FONTS.font400,
    color: Themes.COLORS.textSecondary,
  },
  btnSubmit: {
    width: '100%',
    marginTop: '24@s',
  },
  btnCancel: {
    backgroundColor: Themes.COLORS.white,
    width: '100%',
    marginTop: '4@s',
    marginBottom: '24@s',
  },
  textCancel: {
    color: Themes.COLORS.textSecondary,
  },
  btnClose: {
    height: '48@s',
    width: '48@s',
    borderRadius: '48@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.COLORS.primary,
    marginTop: '32@s',
  },
  textDisable: {
    color: Themes.COLORS.subText,
  },
  iconDisable: {
    tintColor: Themes.COLORS.subText,
  },
});

export default forwardRef(ModalArtSetting);
