import styled from 'styled-components'
import { DatePicker, Form, Image, Input, InputNumber, Select, Space, Typography } from 'antd'

export const PageStack = styled(Space).attrs({
  direction: 'vertical',
  size: 'middle',
})`
  width: 100%;
`

export const PageIntro = styled.div`
  min-width: 0;
`

export const PageTitle = styled(Typography.Title).attrs({
  level: 2,
})`
  && {
    margin: 0;
    letter-spacing: 0;
  }
`

export const PageDescription = styled(Typography.Text).attrs({
  type: 'secondary',
})`
  display: block;
  margin-top: 4px;
`

export const CompactParagraph = styled(Typography.Paragraph)`
  && {
    margin: 0;
  }
`

export const Toolbar = styled(Space).attrs({
  wrap: true,
})`
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: stretch;

    > .ant-space-item {
      width: 100%;
    }
  }
`

export const FilterGroup = styled(Space).attrs({
  wrap: true,
})`
  @media (max-width: 768px) {
    width: 100%;

    > .ant-space-item {
      width: 100%;
    }
  }
`

export const SearchInput = styled(Input.Search)`
  width: ${({ $width = 320 }) => typeof $width === 'number' ? `${$width}px` : $width};
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SelectFilter = styled(Select)`
  width: ${({ $width = 220 }) => typeof $width === 'number' ? `${$width}px` : $width};
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const MinWidthSelect = styled(Select)`
  min-width: ${({ $width = 180 }) => typeof $width === 'number' ? `${$width}px` : $width};
`

export const FullWidthSpace = styled(Space).attrs({
  direction: 'vertical',
  size: 'middle',
})`
  width: 100%;
`

export const ModalForm = styled(Form)`
  margin-top: 20px;
`

export const FormActions = styled(Space)`
  width: 100%;
  justify-content: flex-end;
`

export const RightAlignedActions = styled(Space).attrs({
  wrap: true,
})`
  justify-content: flex-end;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  width: 100%;

  .ant-select,
  .ant-picker,
  .ant-input,
  .ant-input-number {
    width: 100%;
  }
`

export const FieldBlock = styled.div`
  min-width: 0;

  .ant-input,
  .ant-input-number {
    width: 100%;
    margin-top: 6px;
  }
`

export const FullWidthInputNumber = styled(InputNumber)`
  width: 100%;
`

export const FullWidthDatePicker = styled(DatePicker)`
  width: 100%;
`

export const TableImage = styled(Image)`
  border-radius: ${({ $radius = 10 }) => typeof $radius === 'number' ? `${$radius}px` : $radius};
  object-fit: cover;
`

export const ImagePlaceholder = styled.div`
  width: ${({ $width = 44 }) => typeof $width === 'number' ? `${$width}px` : $width};
  height: ${({ $height = 44 }) => typeof $height === 'number' ? `${$height}px` : $height};
  border-radius: ${({ $radius = 10 }) => typeof $radius === 'number' ? `${$radius}px` : $radius};
  background: #f2f2f2;
`

export const ThumbnailImage = styled.img`
  width: ${({ $width = 54 }) => typeof $width === 'number' ? `${$width}px` : $width};
  height: ${({ $height = 42 }) => typeof $height === 'number' ? `${$height}px` : $height};
  border-radius: ${({ $radius = 8 }) => typeof $radius === 'number' ? `${$radius}px` : $radius};
  object-fit: cover;
`
