import { Button, Drawer, Empty, Input } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SearchTrigger = styled(Button)`
  && {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
  }
`

export const SearchDrawerPanel = styled(Drawer)`
  .ant-drawer-header {
    border-bottom: 1px solid #eef0f3;
  }

  .ant-drawer-title {
    color: #111827;
    font-size: 18px;
    font-weight: 760;
  }
`

export const SearchStack = styled.div`
  width: min(980px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 18px;
`

export const SearchInput = styled(Input.Search)`
  .ant-input-affix-wrapper,
  .ant-input-search-button {
    min-height: 44px;
    border-radius: 8px;
  }
`

export const CategoryRail = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CategoryPill = styled(Link)`
  flex: 0 0 auto;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #ffffff;
  color: #111827;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: #111827;
    color: #111827;
    transform: translateY(-1px);
  }
`

export const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`

export const ResultLink = styled(Link)`
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 92px;
  padding: 10px;
  border: 1px solid #eef0f3;
  border-radius: 8px;
  background: #ffffff;
  color: inherit;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: #d5dae3;
    box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);
    color: inherit;
    transform: translateY(-1px);
  }
`

export const ResultImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 8px;
  object-fit: cover;
  background: #f4f5f7;
`

export const ResultFallback = styled.div`
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f4f5f7;
  color: #9ca3af;
  font-weight: 800;
`

export const ResultBody = styled.div`
  min-width: 0;
`

export const ResultTitle = styled.h3`
  margin: 0 0 6px;
  color: #111827;
  font-size: 14px;
  font-weight: 760;
  line-height: 1.35;
`

export const ResultPrice = styled.div`
  color: #6b7280;
  font-size: 13px;
  font-weight: 650;
`

export const SearchEmpty = styled(Empty)`
  padding: 26px 0;
`
