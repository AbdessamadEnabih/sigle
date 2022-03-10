import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Link from 'next/link';
import Div100vh from 'react-div-100vh';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import posthog from 'posthog-js';
import {
  TwitterLogoIcon,
  GitHubLogoIcon,
  DiscordLogoIcon,
} from '@radix-ui/react-icons';
import { userSession } from '../../../utils/blockstack';
import { sigleConfig } from '../../../config';
import { useAuth } from '../../auth/AuthContext';

// We have to use react-div-100vh instead of css 100vh because of a bug in IOS
const Container = styled(Div100vh)`
  ${tw`w-full flex`}
`;

const Sidebar = styled.div`
  ${tw`bg-grey-light flex flex-col items-end hidden lg:block`}
`;

const SidebarContent = styled.div`
  ${tw`flex flex-col justify-between w-64 h-full`}
`;

const ContentContainer = styled.div`
  ${tw`w-full px-4 lg:px-20 overflow-auto`}
`;

const Content = styled.div`
  ${tw`w-full`}
`;

const LogoContainer = styled.a`
  ${tw`py-6 flex items-center justify-center`};
`;

const Logo = styled.img`
  height: 45px;
`;

const MenuButtonName = styled.button<{ logout?: boolean }>`
  ${tw`py-3 flex items-center justify-center bg-black text-white w-full truncate px-4`};
  ${(props) =>
    props.logout &&
    css`
      ${tw`bg-white text-pink`}
    `}
  span {
    ${tw`truncate`};
  }
`;

const MenuTop = styled.ul`
  ${tw`mt-4 list-none px-3`}
`;

const MenuTopItem = styled.li<{ active: boolean }>`
  a {
    ${tw`py-2 px-3 block rounded text-grey-darker mt-2`}
  }
  a:hover {
    ${tw`bg-grey`}
  }
  ${(props) =>
    props.active &&
    css`
      a {
        ${tw`bg-grey`}
      }
    `}
`;

const MenuBottom = styled.ul`
  ${tw`list-none px-3 pb-2`}
`;

const MenuArrowIcon = styled(ChevronDownIcon)<{ $isOpen: boolean }>`
  ${(props) =>
    props.$isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const MenuBottomItem = styled.li`
  a {
    ${tw`py-2 px-3 block rounded text-sm text-grey-darker font-light`}
  }
  a:hover {
    ${tw`bg-grey`}
  }
`;

const MenuBottomItemSocial = styled.li`
  ${tw`py-2 flex items-center px-3`}
  a {
    ${tw`pr-3`}
  }
`;

const StyledLink = styled.a`
  ${tw`text-sm text-grey-darker no-underline cursor-pointer`};
  :hover {
    ${tw`text-black`};
  }
`;

const iconSize = 14;

/**
 * Page utilities
 */

export const DashboardPageContainer = styled.div`
  ${tw`my-4 lg:my-8`};
`;

export const DashboardSidebar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    userSession.signUserOut();
    window.location.replace(window.location.origin);
    posthog.reset();
  };

  return (
    <SidebarContent>
      <div>
        <Link href="/" passHref>
          <LogoContainer>
            <Logo src="/img/logo.png" alt="logo" />
          </LogoContainer>
        </Link>
        <MenuButtonName onClick={() => setIsLogoutOpen(!isLogoutOpen)}>
          <span>{user?.username}</span>
          <MenuArrowIcon
            $isOpen={isLogoutOpen}
            width={18}
            height={18}
            style={{ marginLeft: 8 }}
          />
        </MenuButtonName>
        {isLogoutOpen && (
          <MenuButtonName logout onClick={handleLogout}>
            Logout
          </MenuButtonName>
        )}
        <MenuTop>
          <MenuTopItem active={router.route === '/'}>
            <Link href="/" passHref>
              <a>Drafts</a>
            </Link>
          </MenuTopItem>
          <MenuTopItem active={router.route === '/published'}>
            <Link href="/published" passHref>
              <a>Published</a>
            </Link>
          </MenuTopItem>
          <MenuTopItem active={router.route === '/settings'}>
            <Link href="/settings" passHref>
              <a>Settings</a>
            </Link>
          </MenuTopItem>
        </MenuTop>
      </div>
      <div>
        <MenuBottom>
          <MenuBottomItem>
            <a
              href={sigleConfig.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </MenuBottomItem>
          <MenuBottomItem>
            <a
              href="https://app.sigle.io/sigleapp.id.blockstack"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </MenuBottomItem>
          <MenuBottomItem>
            <a
              href={sigleConfig.feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </MenuBottomItem>
          <MenuBottomItem>
            <a
              href="https://github.com/sigle/sigle/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              What's new?
            </a>
          </MenuBottomItem>
          <MenuBottomItemSocial>
            <StyledLink href={sigleConfig.twitterUrl} target="_blank">
              <TwitterLogoIcon
                height={iconSize}
                width={iconSize}
                className="icon"
              />
            </StyledLink>
            <StyledLink href={sigleConfig.discordUrl} target="_blank">
              <DiscordLogoIcon
                height={iconSize}
                width={iconSize}
                className="icon"
              />
            </StyledLink>
            <StyledLink href={sigleConfig.githubUrl} target="_blank">
              <GitHubLogoIcon
                height={iconSize}
                width={iconSize}
                className="icon"
              />
            </StyledLink>
          </MenuBottomItemSocial>
        </MenuBottom>
      </div>
    </SidebarContent>
  );
};

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  return (
    <Container>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <ContentContainer>
        <Content>{children}</Content>
      </ContentContainer>
    </Container>
  );
};
