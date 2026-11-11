import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import type { Post } from '@api/types';
import {
  AppText,
  Card,
  EmptyState,
  Header,
  Loader,
  ScreenWrapper,
} from '@components/index';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import type { TabScreen } from '@navigation/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchPosts } from '@store/thunks/postThunks';

/** Example list screen: thunk fetch, pull-to-refresh, infinite scroll, errors. */
const PostsScreen = ({ navigation }: TabScreen<typeof ROUTES.POSTS>) => {
  const dispatch = useAppDispatch();
  const { colors, spacing } = useTheme();
  const { items, total, status, refreshing, error } = useAppSelector(
    state => state.posts,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts({ refresh: true }));
    }
  }, [dispatch, status]);

  const onRefresh = useCallback(() => {
    dispatch(fetchPosts({ refresh: true }));
  }, [dispatch]);

  const onEndReached = useCallback(() => {
    if (items.length < total && status !== 'failed') {
      dispatch(fetchPosts());
    }
  }, [dispatch, items.length, total, status]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <Card
        style={{ marginBottom: spacing.md }}
        onPress={() =>
          navigation.navigate(ROUTES.POST_DETAIL, {
            id: item.id,
            title: item.title,
          })
        }
      >
        <AppText variant="title" numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText
          color="textSecondary"
          numberOfLines={2}
          style={{ marginTop: spacing.xs }}
        >
          {item.body}
        </AppText>
        <AppText
          variant="caption"
          color="primary"
          style={{ marginTop: spacing.sm }}
        >
          👍 {item.reactions.likes} · 👁 {item.views}
        </AppText>
      </Card>
    ),
    [navigation, spacing],
  );

  const isFirstLoad = status === 'loading' && items.length === 0 && !refreshing;

  return (
    <ScreenWrapper
      padding="none"
      header={<Header title="Posts" subtitle={`${total} total`} showMenu />}
    >
      {isFirstLoad ? (
        <Loader message="Loading posts..." />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={[styles.list, { padding: spacing.lg }]}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyState
              title={error ? 'Something went wrong' : 'No posts yet'}
              message={error ?? 'Pull down to refresh.'}
              actionLabel="Try again"
              onAction={onRefresh}
            />
          }
          ListFooterComponent={
            status === 'loading' && items.length > 0 && !refreshing ? (
              <ActivityIndicator
                color={colors.primary}
                style={{ margin: spacing.lg }}
              />
            ) : undefined
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: { flexGrow: 1 },
});

export default PostsScreen;
